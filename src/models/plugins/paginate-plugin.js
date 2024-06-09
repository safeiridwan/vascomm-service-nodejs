const paginate = (schema) => {
    // eslint-disable-next-line require-await
    schema.statics.paginate = async function (filter, options) {
        let sort = '';
        if (options.sortBy) {
            const sortingCriteria = [];
            options.sortBy.split(',').forEach((sortOption) => {
                const [key, order] = sortOption.split(':');
                sortingCriteria.push((order === 'desc' ? '-' : '') + key);
            });
            sort = sortingCriteria.join(' ');
        } else {
            sort = 'createdAt';
        }

        const limit = options.take && parseInt(options.take, 10) > 0 ? parseInt(options.take, 10) : 10;
        const skip = options.skip && parseInt(options.skip, 10) > 0 ? parseInt(options.skip, 10) : 1;
        const page = Math.ceil(skip / limit);

        const countPromise = this.countDocuments(filter).exec();
        let docsPromise = this.find(filter).sort(sort).skip(skip).limit(limit);

        if (options.populate) {
            options.populate.split(',').forEach((populateOption) => {
                docsPromise = docsPromise.populate(
                    populateOption
                        .split('.')
                        .reverse()
                        .reduce((a, b) => ({ path: b, populate: a }))
                );
            });
        }

        docsPromise = docsPromise.exec();

        return Promise.all([countPromise, docsPromise]).then((values) => {
            const [totalResults, results] = values;
            const totalPages = Math.ceil(totalResults / limit);
            const result = {
                results,
                page,
                limit,
                totalPages,
                totalResults,
            };
            return Promise.resolve(result);
        });
    };
};

export {
    paginate
};
