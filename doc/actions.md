Actions
=======

Eureka comes with two types of generic actions: edit and delete.

To enables thoses actions, they have to be specified in the `schemas`:

```
{
    BlogPost: {
        actions: [
            {name: 'edit', label: 'edition', icon: 'glyphicon-pencil'},
            {name: 'delete', label: {en: 'delete', fr: 'supprimer'}, icon: 'glyphicon-trash'}
        ]
        properties: {
            ...
        }
    }
}
```
An action has some properties:
 * `name`: (required) this is the name of the method which will be called when the user call it.
 * `label`: (optional) the name of the action which will be displayed to the users. The label can be i18n.
 * `icon`: (optional) the CSS class names of the icon used to illustrate the action. By default, the glyphicon's icons are availables.
 * secondary: (optional) if true, the action will be be displayed under the cog.

## Adding a custom action

An actions is registered on a Controller. Two steps are needed in order to
create an action on a specified model:

 - register the actions in `schemas`
 - implement the logic into the controller

For instance, we want to be able to "favorite" a BlogPost:

In schemas:

```
{
    BlogPost: {
        actions: [
            ... // other actions
            {name: 'setAsFavorite', label: 'add to my favorite', icon: 'glyphicon-star'}
        ]
    }
}
```

Then in BlogPostDisplayController:

```
App.BlogPostDisplayController = App.GenericModelDisplayController.extend({
    actions: {
        setAsFavorite: function() {
            var model = this.get('model');
            model.set('favorite', true);
            model.save().then(funciton(newModel) {
                ... // update the controller's model with newModel
            });
        }
    }
});
```

## Toggled actions

When having an action that toggle a state of the model, it can be convenient to
have a "toggled" action. This allow to present to the user another action (which
can put the model in the previous state for instance).

Let's reuse our previous example, but when the user has clicked on 'favorite',
the next action would be 'unfavorite":

In schemas:

```
{
    BlogPost: {
        actions: [
            ... // other actions
            {
                name: 'toggleFavorite',
                field: 'favorite',
                toggle: {
                    false: {label: 'add to my favorite', icon: 'glyphicon-star-empty'},
                    true: {label: 'remove from my favorite', icon: 'glyphicon-star'}
                }
            }
        ]
    }
}
```

Then in BlogPostDisplayController:

```
App.BlogPostDisplayController = App.GenericModelDisplayController.extend({
    actions: {
        toggleFavorite: function() {
            var model = this.get('model');
            model.toggleProperty('favorite');
            model.save().then(function(newModel) {
                ... // update the controller's model with newModel
            });
        }
    }
});
```

## Generic actions and transitions

Writting a generic action is as simple as reopen a GenericModel[Page]Controller:

```
App.GenericModelDisplayController.repopen({
    actions: {
        myCustomAction: function() {
            ...
        }
    }
});
```

But sometime, a model might have a custom route. To avoid to deal with this,
Eureka brings an helper to redirect beetween pages. Instead of using the
controller's method `transitionToRoute`, you can use the `transitionToPage`
method which will fall back into a generic route if no specific route is found.
This is specially usefull if you want to create a generic action.

### Example:

Note that the page's name and the model's type are required.

```
App.GenericModelDisplayController.repopen({
    actions: {
        myCustomAction: function() {
            this.transitionToPage('list', modelType);
        },
        myOtherAction: function() {
            this.transitionToPage('edit', modelType, modelId);
        }
    }
});
```