{
    ModelName: {
        title: {
            en: {single: 'Model', plural: 'Models'},
            fr: {single: 'Modèle', plural: 'Modèles'}
        },
        description: {
            en: 'this is a good model',
            fr: "c'est un bon modèle"
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
                        single: 'favoris',
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
                            single: 'model',
                            plural: 'models'
                        },
                        fr: {
                            single: 'modèle',
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

{
    BlogPost: {
        label: {
            en: 'Blog post'
        },
        description: {
            en: 'A blog post is a ...'
        },
        properties: {
            title: {
                label: {
                    en: 'title',
                    fr: 'titre'
                },
                description: {
                    en: 'the title of the blog post',
                    fr: "le titre de l'article de blog"
                },
                type: 'string',
                required: true,
                i18n: true,

            },
            body: {
                type: 'string'
            }
        }
    }
}