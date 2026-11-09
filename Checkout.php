<?php
// Save as C:\inetpub\config\shop-config.php on the web server. NEVER put this file in GitHub or the web root.
return [
    'db_host'       => '10.0.1.200',
    'db_port'       => 5432,
    'db_name'       => 'exp626_shop',
    'db_user'       => 'shop_app',
    'db_pass'       => 'PUT_THE_SHOP_APP_PASSWORD_HERE',
    'db_sslmode'    => 'prefer',
 
    'smtp_host'     => '127.0.0.1',
    'smtp_port'     => 25,
    'mail_from'     => 'support@experiment626.com',
    'support_email' => 'support@experiment626.com',
 
    'log_file'      => 'C:\\inetpub\\shoplogs\\shop-errors.log',
];
 
