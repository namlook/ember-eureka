
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
            style: "col-sm-offset-2",
            type: 'outlet'
        }
    ]
};