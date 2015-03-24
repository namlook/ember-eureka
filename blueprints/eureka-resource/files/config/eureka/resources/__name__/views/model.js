export default {
    widgets: [
        {
            type: 'model-navbar',
            secondaryActions: [
                {label: 'edit', icon: 'glyphicon glyphicon-pencil', route: 'eureka.<%= resource %>.model.edit'},
                {name: 'delete', label: 'delete', icon: 'glyphicon glyphicon-trash'}
            ]
        }
    ]
};