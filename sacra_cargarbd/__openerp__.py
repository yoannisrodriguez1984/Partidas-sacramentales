{
'name': 'sacra_cargarbd',
'description': u'Módulo para realizar la importación de datos del sistema de gestion sacramental de la v6 a la v9',
'author': 'sacra',
'depends': ['sacramentum'],
'application': True,
'data': [
    'security/sacramentum_security.xml',
    "security/ir.model.access.csv",
    'view/config_bd_view.xml',
    'view/mostrar_info_proceso.xml',
    'view/wizard_import_data.xml',
    'view/menu_view.xml',
    ],
}