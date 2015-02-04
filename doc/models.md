Model example
=============

the current model:


    {
        ModelName: {
            title: {...}
            description: {...}
            representationFields: {...}
            i18n: {...}
            search: {...}
            actions: [...]
            fieldsets: [...]
            populate: {...}
            limit: 10
            hidden: true
            sortBy: [...]
            filters: [...]
            static: true
            schema: {...}
        }
    }


becomes this:


    {
        ModelName: {
            title: {...}
            description: {...}
            representationFields: {...}
            views: {...}
            static: true
            hidden
            schema: {...}
        }
    }


or more precisly this:


    {
        ModelName: {
            title: {
                en: {singular: 'Model', plural: 'Models'},
                fr: {singular: 'Modèle', plural: 'Modèles'}
            },
            description: {
                en: 'this is a good model',
                fr: 'c'est un bon modèle
            },
            representationFields: {
                titleField: 'title',
                descriptionField: 'description',
                thumbField: 'thumb',
                geolocationField: 'geolocation'
            },
            i18n: {
                i18nField: 'lang',
                queryOnCurrentLang: true
            },
            static: false,
            hidden: false,
            views: {
                index: {
                    limit: 10,
                    populate: 1,
                    search: {
                        field: 'title',
                        enableAdvancedQuery: true,
                        placeholder: {
                            en: 'search a model',
                            fr: 'rechercher un modèle'
                        }
                    }
                    sortBy: {
                        label: {en: 'sort by', fr: 'trier par'},
                        orders: [
                            {label: {en: 'title (asc)', fr: 'titre (asc)'}, order: 'title' },
                            {label: {en: 'title (desc)', fr: 'titre (desc)'}, order: '-title' }
                        ]
                    },
                    filters: [
                        {
                            route: 'model-name.favorite',
                            label: {en: 'Favorites', fr: 'Favoris'},
                            icon: 'glyphicon glyphicon-ok'}
                        }
                    ]
                },
                display: {
                    populate: 2,
                    fielsets: [
                        {
                            label: {en: 'First fieldset', fr: 'Premier group'},
                            fields: ['title', 'favorite']
                        }
                    ],
                    actions: [
                        {name: 'delete', label: {en: 'delete', fr: 'supprimer'}, secondary: false},
                        {name: 'advancedAction', label: {en: 'advanced action', fr: 'action avancée'}, secondary: true},
                        {
                            name: 'toggleAction',
                            field: 'favorite',
                            toggle: {
                                false: {label: {en: 'add to favorites', fr: 'ajouter au favoris', icon: 'glyphicon glyphicon-unchecked'},
                                true:  {label: {en: 'uncheck boolean', fr: 'enlever des favoris', icon: 'glyphicon glyphicon-check'},
                            }
                        }
                    ],
                    relations: [
                        {field: '', label: {en: '', fr: ''}, icon: ''},
                        {field: '', label: {en: '', fr: ''}, icon: ''}
                    ],
                    geolocation: {
                        map: true
                    }
                }
                new: {
                    fielsets: [
                        {
                            label: {en: 'First fieldset', fr: 'Premier group'},
                            fields: ['title', 'favorite']
                        }
                    ],
                }
                edit: {
                    fielsets: [
                        {
                            label: {en: 'First fieldset', fr: 'Premier group'},
                            fields: ['title', 'favorite']
                        }
                    ],
                }
            },
            schema: {
                title: {
                    type: 'string',
                    title: {
                        fr: 'titre'
                    }
                },
                favorite: {
                    type: 'boolean',
                    title: {
                        en: {
                            plural: 'favorites'
                        },
                        fr: {
                            singular: 'favoris',
                            plural: 'favoris'
                        }
                    }
                },
                lang: {
                    type: 'string'
                },
                relation: {
                    type: 'OtherModel',
                    reverse: {
                        name: 'modelName',
                        title: {
                            en: {
                                singular: 'model',
                                plural: 'models'
                            },
                            fr: {
                                singular: 'modèle',
                                plural: 'modèles'
                            }
                        }
                    },
                    suggest: {
                        field: 'otherTitle',
                        sortBy: '-otherField'
                        // title: {template: "erf: {{title}}"}
                    }
                }
            }
        }
    }


And with roles:

 {
    ModelName: {
        label: {
            en: {singular: 'Model', plural: 'Models'},
            fr: {singular: 'Modèle', plural: 'Modèles'}
        },
        description: {
            en: 'this is a good model',
            fr: 'c'est un bon modèle
        },
        aliases: {
            title: 'title',
            description: 'description',
            thumbUrl: 'thumbUrl',
            geolocation: 'geolocation'
        },
        i18n: {
            i18nField: 'lang',
            queryOnCurrentLang: true
        },
        static: false,
        hidden: false,
        views: {
            index: {
                limit: 10,
                populate: 1,
                search: {
                    field: 'title',
                    enableAdvancedQuery: true,
                    placeholder: {
                        en: 'search a model',
                        fr: 'rechercher un modèle'
                    }
                }
                sortBy: {
                    label: {en: 'sort by', fr: 'trier par'},
                    orders: [
                        {label: {en: 'title (asc)', fr: 'titre (asc)'}, order: 'title' },
                        {label: {en: 'title (desc)', fr: 'titre (desc)'}, order: '-title' }
                    ]
                },
                filters: [
                    {
                        route: 'model-name.favorite',
                        label: {en: 'Favorites', fr: 'Favoris'},
                        icon: 'glyphicon glyphicon-ok'}
                    }
                ]
            },
            display: {
                populate: 2,
                fielsets: [
                    {
                        label: {en: 'First fieldset', fr: 'Premier group'},
                        fields: ['title', 'favorite']
                    }
                ],
                actions: [
                    {name: 'delete', label: {en: 'delete', fr: 'supprimer'}, secondary: false},
                    {name: 'advancedAction', label: {en: 'advanced action', fr: 'action avancée'}, secondary: true},
                    {
                        name: 'toggleFavorite',
                        field: 'favorite',
                        toggle: {
                            false: {label: {en: 'add to favorites', fr: 'ajouter au favoris', icon: 'glyphicon glyphicon-unchecked'},
                            true:  {label: {en: 'unfavorite', fr: 'enlever des favoris', icon: 'glyphicon glyphicon-check'},
                        }
                    }
                ],
                relations: [
                    {field: '', label: {en: '', fr: ''}, icon: ''},
                    {field: '', label: {en: '', fr: ''}, icon: ''}
                ],
                geolocation: {
                    map: true
                }
            }
            new: {
                fielsets: [
                    {
                        label: {en: 'First fieldset', fr: 'Premier group'},
                        fields: ['title', 'favorite']
                    }
                ],
            }
            edit: {
                fielsets: [
                    {
                        label: {en: 'First fieldset', fr: 'Premier group'},
                        fields: ['title', 'favorite']
                    }
                ],
            }
        },
        permissions: {
            index: 'public',
            display: 'loggedIn',
            new: 'loggedIn',
            edit: 'owner',
            delete: 'owner',
            advancedAction: 'admin',
            toggleFavorites: 'owner'
        }, // TODO /!\ on ne peut pas ajouter quelqu'un de specifique, il faut mettre ces permissions dans la base de données...
        schema: {
            title: {
                permissions: {
                    read: 'public',
                    write: 'owner'
                },
                type: 'string',
                label: {
                    fr: 'titre'
                }
            },
            favorite: {
                permissions: {
                    read: 'owner',
                    write: 'owner'
                }
                type: 'boolean',
                label: {
                    en: {
                        plural: 'favorites'
                    },
                    fr: {
                        singular: 'favoris',
                        plural: 'favoris'
                    }
                }
            },
            lang: {
                type: 'string'
            },
            relation: {
                type: 'OtherModel',
                reverse: {
                    name: 'modelName',
                    label: {
                        en: {
                            singular: 'model',
                            plural: 'models'
                        },
                        fr: {
                            singular: 'modèle',
                            plural: 'modèles'
                        }
                    }
                },
                suggest: {
                    field: 'otherTitle',
                    sortBy: '-otherField'
                    // title: {template: "erf: {{title}}"}
                }
            }
        }
    }
}
