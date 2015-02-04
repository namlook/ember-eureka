Search a document
=================

    {
      BlogPost: {
        search: {
          field: 'title',
          enableAdvancedQuery: true,
          placeholder: 'search a really custom object...'
        },
        schema: {
          title: {type: string},
          body: {type: string}
        }
    }

 - `field`: the field to query
 - `placeholder`: the placeholder to display
 - `enableAdvancedQuery`: if true, then allow the user to perform advanced queries

## Simple query

Search all documents that match the value. The query is perform as a regular
expression on the field specified in `search.field`.

## Advanced Query

Sometimes, searching on a single field is not enough on we want to query on
multiple fields or use operators (like >, !=, regexp...).

First, enable advanced query by setting `search.enableAdvancedQuery` to `true`.

To make an advanced query, start your search by a question mark ("?") and select
a field.

Example:

    ?title

Advanced queries are very powerful. You can reach fields on relations.