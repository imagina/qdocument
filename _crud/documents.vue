<template></template>
<script>
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
        entityName: config("main.qdocument.entityNames.document"),
        apiRoute: 'apiRoutes.qdocument.documents',
        permission: 'idocs.documents',
        extraFormFields: 'idocs.crud-fields.documents',
        create: {
          title: this.$tr('idocs.cms.newDocument'),
        },
        read: {
          columns: [
            {
              name: 'id', label: this.$tr('isite.cms.form.id'),
              field: 'id',
              sortable: true,
            },
            {
              name: 'title', label: this.$tr('isite.cms.form.title'),
              field: 'title',
              align: 'left',
              sortable: true,
            },
            {
              name: 'status', label: this.$tr('isite.cms.form.status'), field: 'status', align: 'left',
              asStatus: true
            },
            {
              name: 'private', label: this.$tr('isite.cms.form.type'), field: 'private', align: 'left',
              format : val => val ? (parseInt(val) ? this.$tr('isite.cms.label.private') : this.$tr('isite.cms.label.public')) : ''
            },
            {
              name: 'category', label: this.$tr('isite.cms.form.category'), align: 'left',
              field: 'category', sortable: true, format: val => ((val && val.title) ? val.title : '-')
            },
            {
              name: 'createdAt', label: this.$tr('isite.cms.form.createdAt'), field: 'createdAt',
              format: val => val ? this.$trd(val) : '-',
              align: 'left', sortable: true
            },
            {
              name: 'actions', label: this.$tr('isite.cms.form.actions'), align: 'center'
            },
          ],
          requestParams: {include: 'category,qrs'},
          actions: [
            {
              label: this.$tr("isite.cms.label.download"),
              format: (item) => {
                return { vIf: item.url ? true : false }
              },
              icon: "fas fa-file-download",
              action: (item) => this.$helper.downloadFromURL(item.publicUrl),
            }
          ],
        },
        update: {
          title: this.$tr('idocs.cms.updateDocument'),
          requestParams: {include: 'users'}
        },
        delete: true,
        formLeft: {
          id: {value: ''},
          key: {value: null},
          title: {
            value: '',
            type: 'input',
            isTranslatable: true,
            props: {
              label: `${this.$tr('isite.cms.form.title')}*`,
              rules: [
                val => !!val || this.$tr('isite.cms.message.fieldRequired')
              ],
            },
          },
          description: {
            value: '',
            type: 'html',
            isTranslatable: true,
            props: {
              label: `${this.$tr('isite.cms.form.description')}*`,
              rules: [
                val => !!val || this.$tr('isite.cms.message.fieldRequired')
              ],
            }
          }
        },
        formRight: {
          categoryId: {
            value: null,
            type: 'crud',
            props: {
              crudType: 'select',
              crudData: import('modules/qdocument/_crud/categories'),
              crudProps: {
                label: `${this.$tr('isite.cms.form.category')}*`,
                rules: [
                  val => !!val || this.$tr('isite.cms.message.fieldRequired')
                ],
              },
            },
          },
          status: {
            value: '1',
            type: 'select',
            props: {
              label: this.$tr('isite.cms.form.status'),
              options: [
                {label: this.$tr('isite.cms.label.enabled'), value: '1'},
                {label: this.$tr('isite.cms.label.disabled'), value: '0'},
              ]
            },
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
          users: {
            value: [],
            type: 'select',
            props: {
              label: this.$tr('isite.cms.label.shareWith'),
              multiple: true,
              useChips: true
            },
            loadOptions: {
              apiRoute: 'apiRoutes.quser.users',
              select: {label: 'fullName', id: 'id'}
            }
          },
          mediasSingleFile: {
            name: 'mediasSingle',
            value: {},
            type: 'media',
            props: {
              label: `${this.$tr('isite.cms.label.file')}*`,
              zone: 'file',
              entity: "Modules\\Idocs\\Entities\\Document",
              entityId: null,
              disk: 'privatemedia',
              rules: [
                val => (val && val.file) || this.$tr('isite.cms.message.fieldRequired')
              ],
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
