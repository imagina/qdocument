export default {
  documents: {
    permission: 'idocs.documents.manage',
    activated: true,
    authenticated: true,
    path: '/document/documents',
    name: 'qdocument.admin.documents',
    crud : import('modules/qdocument/_crud/documents'),
    page: () => import('modules/qcrud/_pages/admin/crudPage'),
    layout: () => import('layouts/master.vue'),
    title: 'idocs.cms.sidebar.adminDocuments',
    icon: 'fa-light fa-folder-open',
    subHeader: {
      refresh: true,
    }
  },
  categories: {
    permission: 'idocs.categories.manage',
    activated: true,
    authenticated: true,
    path: '/document/categories',
    name: 'qdocument.admin.categories',
    crud : import('modules/qdocument/_crud/categories'),
    page: () => import('modules/qcrud/_pages/admin/crudPage'),
    layout: () => import('layouts/master.vue'),
    title: 'idocs.cms.sidebar.adminCategories',
    icon: 'fa-light fa-layer-group',
    subHeader: {
      refresh: true,
    }
  },
}
