
export default {
    widgets: [
        {
            type: 'application-navbar',
            brand: '<%= applicationName %>'
        },
        {
            columns: 2,
            type: 'application-menu'
        },
        {
            columns: 10,
            type: 'outlet'
        }
    ]
};
