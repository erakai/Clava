export type permission = {
  id : string,
  name : string,  
}

export const permissions : { [hub: string] : permission[] } = {
  'Member Hub': [
    {id: 'VIEW_MEMBERS', name: 'View Members'},
    {id: 'EDIT_MEMBERS', name: 'Edit Members'},
  ],
  'Finance Hub' : [
    {id: 'VIEW_FINANCES', name: 'View Finances'},
    {id: 'EDIT_FINANCES', name: 'Edit Finances'}
  ],
  'Event Hub' : [
    {id: 'EDIT_EVENTS', name: 'Create/Edit Events'}
  ],
  'Document Hub' : [
    {id: 'EDIT_DOCUMENTS', name: 'Create/Edit Documents'}
  ]
}