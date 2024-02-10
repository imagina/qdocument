export default {
  documents: {
    permission: 'idocs.documents.manage',
    activated: true,
    authenticated: true,
    path: '/document/documents',
    name: 'qdocument.panel.documents',
    crud : import('modules/qdocument/_crud/documents'),
    page: () => import('modules/qcrud/_pages/admin/crudPage'),
    layout: () => import('layouts/master'),
    title: 'idocs.cms.sidebar.panelDocuments',
    icon: 'fa-light fa-folder-open',
    subHeader: {
      refresh: true,
    }
  }
}
