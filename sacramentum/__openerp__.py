# -*- coding: utf-8 -*-
{
    'name' : 'Sacramentum',
    'version' : '1.1',
    'summary': 'Sistema de Gestión de Archivos Sacramentales',
    'sequence': 30,
    'description': """
    Sistema de Gestión de Archivos Sacramentales
    """,
    'category': 'SYSTEM',
    'website': '',
    'images' : [],
    'depends' : ['base', 'web',"web_m2x_options","dynamic_listview_advance","web_printscreen_zb","web_mostrar_imagen","web_save_readonlyfields"],
    'data': [
        #Security
        'security/sacramentum_security.xml',
        'security/ir.model.access.csv',
        'data/act_modelos.sql',
        # 'data/config_parameters.xml',
        # 'data/sacra_est_civil.xml',
        'views/sacra_persona.xml',
        'views/sacra_imagen.xml',
        'views/sacra_datos_parroquia.xml',
        'views/sacra_bautismo.xml',
        'views/sacra_matrimonio.xml',
        'views/sacra_confirmacion.xml',
        'views/sacra_defuncion.xml',
        'views/sacra_entable.xml',
        'views/sacra_enmienda.xml',
        'views/sacra_legalizacion.xml',
        'views/sacra_errores.xml',
        'views/sacra_indice.xml',
        'views/wizard_import_data.xml',
        'views/system_main_menu.xml',
        # 'wizard/wizard_sel_vic.xml',
        'report/df_report_sacra.xml',
    ],
    'demo': [
    ],
    'js': [
        # 'static/src/js/sacra.js',
    ],
    'css': [
        # 'static/src/css/sacra.css',
    ],
    'qweb': [
        # 'static/src/xml/sacra.xml',
    ],
    'external_dependencies': {
        'python' : ['xlrd'],
    },
    'installable': True,
    'application': True,
    'auto_install': False,
}
