<template></template>
<script>
  //Component
  import crud from 'modules/qcrud/_components/crud'

  export default {
    data() {
      return {
        crudId: this.$uid()
      }
    },
    computed: {
      crudData() {
        return {
          crudId: this.crudId,
          entityName: config("main.qdocument.entityNames.category"),
          apiRoute: 'apiRoutes.qdocument.categories',
          permission: 'idocs.categories',
          extraFormFields: 'idocs.crud-fields.categories',
          create: {
            title: this.$tr('idocs.cms.newCategory'),
          },
          read: {
            columns: [
              {name: 'id', label: this.$tr('isite.cms.form.id'), field: 'id', style: 'width: 50px'},
              {name: 'name', label: this.$tr('isite.cms.form.title'), field: 'title', align: 'rigth'},
              {name: 'slug', label: this.$tr('isite.cms.form.slug'), field: 'slug', align: 'left'},
              {
                name: 'private', label: this.$tr('isite.cms.form.type'), field: 'private', align: 'left',
                format : val => val ? (parseInt(val) ? this.$tr('isite.cms.label.private') : this.$tr('isite.cms.label.public')) : ''
              },
              {
                name: 'parent', label: this.$tr('isite.cms.form.parent'), field: 'parent', align: 'left',
                format: val => val ? (val.title ? val.title : '-') : '-'
              },
              {
                name: 'created_at', label: this.$tr('isite.cms.form.createdAt'), field: 'createdAt', align: 'left',
                format: val => val ? this.$trd(val) : '-',
              },
              {name: 'actions', label: this.$tr('isite.cms.form.actions'), align: 'left'},
            ],
            requestParams: {include: 'parent'}
          },
          update: {
            title: this.$tr('idocs.cms.updateCategory'),
            requestParams: {include: 'parent'}
          },
          delete: true,
          formLeft: {
            id: {value: ''},
            userId: {value: this.$store.state.quserAuth.userId},
            title: {
              value: '',
              type: 'input',
              isTranslatable: true,
              props : {
                label: `${this.$tr('isite.cms.form.title')}*`,
                rules: [
                  val => !!val || this.$tr('isite.cms.message.fieldRequired')
                ],
              },
            },
            slug: {
              value: '',
              type: 'input',
              isTranslatable: true,
              props : {
                label: `${this.$tr('isite.cms.form.slug')}*`,
                rules: [
                  val => !!val || this.$tr('isite.cms.message.fieldRequired')
                ],
              }
            },
            description: {
              value: '',
              type: 'html',
              isTranslatable: true,
              props : {
                label: `${this.$tr('isite.cms.form.description')}*`,
                rules: [
                  val => !!val || this.$tr('isite.cms.message.fieldRequired')
                ],
              }
            },
          },
          formRight: {
            parentId: {
              value: 0,
              type: 'select',
              props : {
                label: this.$tr('isite.cms.form.parent'),
                options : [
                  {label: this.$tr('isite.cms.label.disabled'), value: 0},
                ],
              },
              loadOptions: {
                apiRoute: 'apiRoutes.qdocument.categories',
                select: {label: 'title', id: 'id'},
                requestParams: {include: 'parent'}
              }
            },
            private: {
              value: '0',
              type: 'select',
              props: {
                label: this.$tr('isite.cms.form.type'),
                options: [
                  {label: this.$tr('isite.cms.label.private'), value: '1'},
                  {label: this.$tr('isite.cms.label.public'), value: '0'},
                ]
              },
            },
            mediasSingle: {
              name: 'mediasSingle',
              value: {},
              type: 'media',
              props : {
                label: this.$tr('isite.cms.form.firstImage'),
                zone: 'mainimage',
                entity: "Modules\\Idocs\\Entities\\Category",
                entityId: null
              }
            }
          },
        }
      },
      //Crud info
      crudInfo() {
        return this.$store.state.qcrudComponent.component[this.crudId] || {}
      }
    },
  }
</script>
