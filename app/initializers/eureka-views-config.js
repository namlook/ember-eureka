
import Ember from 'ember';
import config from '../config/environment';


/** collection recursively all the route infos from the resource's view structure */
var collectResourceViews = function(resource, resourceViews, collection, root) {
    root = root || resource.dasherize();

    collection = collection || [{resource: resource, inner: true, path: root}];

    /* load inner index route: ('blog.index' for the blog resource) */
    if (root) {
        collection.push({resource: resource, name: 'index', path: root+'.index'});
    }

    var item;
    Ember.keys(resourceViews).forEach(function(viewName) {
        item = {resource: resource, name: viewName};

        if (root) {
            item.path = root+'.'+viewName;
        } else {
            item.path = viewName;
        }


        if (resourceViews[viewName].outlet) {
            item.inner = true;
            if (!collection.findBy('path', item.path)) {
                collection.push(item);
            }
            collectResourceViews(resource, resourceViews[viewName], collection, item.path);
            var innerIndexItem = {resource: resource, name: 'index', path: item.path+'.index'};
            if (!collection.findBy('path', innerIndexItem.path)) {
                collection.push(innerIndexItem);
            }
        } else {
            if (viewName !== 'outlet') {
                if (!collection.findBy('path', item.path)) {
                    collection.push(item);
                }
            }
        }
    });
    return collection;
};


/*** return all routes informations from the config ***/
var getEurekaRoutesInfo = function(eurekaConfig) {
    var eurekaResourceRoutes = Ember.A();
    var applicationViews = Ember.getWithDefault(eurekaConfig, 'views', {});

    eurekaResourceRoutes.pushObjects(collectResourceViews('', applicationViews));

    var resources = Ember.keys(eurekaConfig.resources);

    var resourceViews;
    resources.forEach(function(resource) {
        resourceViews = eurekaConfig.resources[resource].views;

        if (resourceViews) {
            eurekaResourceRoutes.pushObjects(collectResourceViews(resource, resourceViews));
        }
    });
    return eurekaResourceRoutes;
}


/** extract view config from the routeInfo **/
var getViewConfig = function(routeInfo, eurekaConfig) {

    var viewPath, fullViewPath;
    if (!routeInfo.resource) {
        viewPath = routeInfo.path;
        fullViewPath = 'views';
    } else {
        viewPath = routeInfo.path.split('.').slice(1).join('.');
        fullViewPath = routeInfo.resource+'.views';
    }

    if (viewPath) {
        fullViewPath = fullViewPath+'.'+viewPath;
    }


    var viewConfig;
    if (!routeInfo.resource) {
        viewConfig = Ember.getWithDefault(eurekaConfig, fullViewPath, {});
    } else {
        viewConfig = Ember.getWithDefault(eurekaConfig.resources, fullViewPath, {});
    }

    if (viewConfig.outlet) {
        if (typeof(viewConfig.outlet) === 'object') {
            viewConfig = viewConfig.outlet;
        } else {
            viewConfig = {};
        }
    }

    viewConfig = viewConfig || {};

    // add the widgets to viewConfig if is doesn't exists
    viewConfig.widgets = Ember.A(viewConfig.widgets);


    // if the view is an inner view and doesn't specify an outlet, we add it
    if (routeInfo.inner && !viewConfig.widgets.findBy('type', 'outlet')) {
        viewConfig.widgets.pushObject({type: 'outlet'});
    }

    if (routeInfo.inner) {
        viewConfig.isOutlet = true;
    }

    return viewConfig;
};


export function initialize(container, application) {

    var eurekaConfig = JSON.parse(JSON.stringify(config.APP.eureka));
    var eurekaRoutesInfo = getEurekaRoutesInfo(eurekaConfig);
    var EUREKA_VIEWS_CONFIG = {};

    var viewConfig, _view;
    eurekaRoutesInfo.forEach(function(routeInfo) {
        viewConfig = getViewConfig(routeInfo, eurekaConfig);

        _view = Ember.Object.create({
            info: routeInfo,
            config: viewConfig
        });


        var fullViewPath = 'eureka';
        if (routeInfo.path) {
            fullViewPath += '.'+routeInfo.path;
        }

        routeInfo.path = fullViewPath;
        fullViewPath = fullViewPath.replace(/\./g, '/');
        EUREKA_VIEWS_CONFIG[fullViewPath] = _view;
    });

    EUREKA_VIEWS_CONFIG = Ember.Object.create(EUREKA_VIEWS_CONFIG);

    application.register('eurekaConfig:views', EUREKA_VIEWS_CONFIG, {instantiate: false, singleton: true});
    application.inject('route', 'EUREKA_VIEWS_CONFIG', 'eurekaConfig:views');
    application.inject('controller', 'EUREKA_VIEWS_CONFIG', 'eurekaConfig:views');
    application.inject('model', 'EUREKA_VIEWS_CONFIG', 'eurekaConfig:views');
}

export default {
  name: 'eureka-views-config',
  initialize: initialize
};