export default {
    widgets: [
        {
            type: 'model-form',
            actions: {
                save: {
                    transitionTo: 'eureka.<%= resource %>.model.index'
                },
                cancel: {
                    transitionTo: 'eureka.<%= resource %>.model.index'
                }
            }

        }
    ]
};