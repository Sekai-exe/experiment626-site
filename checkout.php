<?php
declare(strict_types=1);

/*
 * Experiment 626 - checkout endpoint.
 * Receives {name, email, items:[{pid,size,color,qty}]} from the store, recomputes every price
 * on the server, saves the order to PostgreSQL (prepared statements, one transaction) and
 * emails a receipt. Credentials live in ..\config\shop-config.php, outside the web root.
 */

function catalog(): array
{
    static $c = null;
    if ($c === null) {
        $c = json_decode(<<<'JSON'
{"short-1":{"name":"Dune Study Short Sleeve Tee","db":"Short Sleeve T-Shirt","desc":"Four layers of low hills under a late sun, in warm sand and plum.","sizes":{"s":{"label":"S","price":26},"m":{"label":"M","price":26},"l":{"label":"L","price":26},"xl":{"label":"XL","price":26},"xxl":{"label":"2XL","price":28}},"colors":{"white":"White","black":"Black","gray":"Heather gray"},"defColor":"white","base":26},"short-3":{"name":"Fourth Orbit Short Sleeve Tee","db":"Short Sleeve T-Shirt","desc":"Seven rings around a dark core, with small planets caught mid-turn.","sizes":{"s":{"label":"S","price":26},"m":{"label":"M","price":26},"l":{"label":"L","price":26},"xl":{"label":"XL","price":26},"xxl":{"label":"2XL","price":28}},"colors":{"white":"White","black":"Black","gray":"Heather gray"},"defColor":"white","base":26},"short-4":{"name":"Quarter Turn Short Sleeve Tee","db":"Short Sleeve T-Shirt","desc":"A twelve-cell grid of arcs, circles and half blocks in loud citrus.","sizes":{"s":{"label":"S","price":26},"m":{"label":"M","price":26},"l":{"label":"L","price":26},"xl":{"label":"XL","price":26},"xxl":{"label":"2XL","price":28}},"colors":{"white":"White","black":"Black","gray":"Heather gray"},"defColor":"white","base":26},"short-6":{"name":"Monolith at Noon Short Sleeve Tee","db":"Short Sleeve T-Shirt","desc":"One tall slab on a striped plain beneath a pale amber sun.","sizes":{"s":{"label":"S","price":26},"m":{"label":"M","price":26},"l":{"label":"L","price":26},"xl":{"label":"XL","price":26},"xxl":{"label":"2XL","price":28}},"colors":{"white":"White","black":"Black","gray":"Heather gray"},"defColor":"white","base":26},"short-9":{"name":"Rosette Short Sleeve Tee","db":"Short Sleeve T-Shirt","desc":"Concentric rings in pink and plum that read like a cut flower.","sizes":{"s":{"label":"S","price":26},"m":{"label":"M","price":26},"l":{"label":"L","price":26},"xl":{"label":"XL","price":26},"xxl":{"label":"2XL","price":28}},"colors":{"white":"White","black":"Black","gray":"Heather gray"},"defColor":"white","base":26},"short-12":{"name":"Pale Moon Short Sleeve Tee","db":"Short Sleeve T-Shirt","desc":"A dusky pink sky, a tall dark slab and a quiet moon.","sizes":{"s":{"label":"S","price":26},"m":{"label":"M","price":26},"l":{"label":"L","price":26},"xl":{"label":"XL","price":26},"xxl":{"label":"2XL","price":28}},"colors":{"white":"White","black":"Black","gray":"Heather gray"},"defColor":"white","base":26},"long-2":{"name":"Low Tide Long Sleeve Tee","db":"Long Sleeve T-Shirt","desc":"Stacked bands of water in teal and deep blue, cut with pale foam.","sizes":{"s":{"label":"S","price":32},"m":{"label":"M","price":32},"l":{"label":"L","price":32},"xl":{"label":"XL","price":32},"xxl":{"label":"2XL","price":34}},"colors":{"white":"White","black":"Black","gray":"Heather gray"},"defColor":"white","base":32},"long-5":{"name":"Ridge Lines Long Sleeve Tee","db":"Long Sleeve T-Shirt","desc":"Topographic contours of an imaginary hill, drawn in three greens.","sizes":{"s":{"label":"S","price":32},"m":{"label":"M","price":32},"l":{"label":"L","price":32},"xl":{"label":"XL","price":32},"xxl":{"label":"2XL","price":34}},"colors":{"white":"White","black":"Black","gray":"Heather gray"},"defColor":"white","base":32},"long-7":{"name":"Evening Hills Long Sleeve Tee","db":"Long Sleeve T-Shirt","desc":"The same rolling ground after dark, lit by a gold moon.","sizes":{"s":{"label":"S","price":32},"m":{"label":"M","price":32},"l":{"label":"L","price":32},"xl":{"label":"XL","price":32},"xxl":{"label":"2XL","price":34}},"colors":{"white":"White","black":"Black","gray":"Heather gray"},"defColor":"white","base":32},"long-8":{"name":"Salt Flats Long Sleeve Tee","db":"Long Sleeve T-Shirt","desc":"Grey-blue ripples across a dry lakebed, with one warm band.","sizes":{"s":{"label":"S","price":32},"m":{"label":"M","price":32},"l":{"label":"L","price":32},"xl":{"label":"XL","price":32},"xxl":{"label":"2XL","price":34}},"colors":{"white":"White","black":"Black","gray":"Heather gray"},"defColor":"white","base":32},"long-10":{"name":"Block Party Long Sleeve Tee","db":"Long Sleeve T-Shirt","desc":"The grid again, cooled down to sea greens and navy.","sizes":{"s":{"label":"S","price":32},"m":{"label":"M","price":32},"l":{"label":"L","price":32},"xl":{"label":"XL","price":32},"xxl":{"label":"2XL","price":34}},"colors":{"white":"White","black":"Black","gray":"Heather gray"},"defColor":"white","base":32},"long-11":{"name":"Terraces Long Sleeve Tee","db":"Long Sleeve T-Shirt","desc":"Contour lines in orange and red, like rice terraces from above.","sizes":{"s":{"label":"S","price":32},"m":{"label":"M","price":32},"l":{"label":"L","price":32},"xl":{"label":"XL","price":32},"xxl":{"label":"2XL","price":34}},"colors":{"white":"White","black":"Black","gray":"Heather gray"},"defColor":"white","base":32},"mug-1":{"name":"Dune Study Mug","db":"Mug","desc":"Four layers of low hills under a late sun, in warm sand and plum.","sizes":{"11":{"label":"11 oz","price":16},"15":{"label":"15 oz","price":19}},"colors":null,"defColor":null,"base":16},"mug-2":{"name":"Low Tide Mug","db":"Mug","desc":"Stacked bands of water in teal and deep blue, cut with pale foam.","sizes":{"11":{"label":"11 oz","price":16},"15":{"label":"15 oz","price":19}},"colors":null,"defColor":null,"base":16},"mug-4":{"name":"Quarter Turn Mug","db":"Mug","desc":"A twelve-cell grid of arcs, circles and half blocks in loud citrus.","sizes":{"11":{"label":"11 oz","price":16},"15":{"label":"15 oz","price":19}},"colors":null,"defColor":null,"base":16},"mug-5":{"name":"Ridge Lines Mug","db":"Mug","desc":"Topographic contours of an imaginary hill, drawn in three greens.","sizes":{"11":{"label":"11 oz","price":16},"15":{"label":"15 oz","price":19}},"colors":null,"defColor":null,"base":16},"mug-9":{"name":"Rosette Mug","db":"Mug","desc":"Concentric rings in pink and plum that read like a cut flower.","sizes":{"11":{"label":"11 oz","price":16},"15":{"label":"15 oz","price":19}},"colors":null,"defColor":null,"base":16},"mug-10":{"name":"Block Party Mug","db":"Mug","desc":"The grid again, cooled down to sea greens and navy.","sizes":{"11":{"label":"11 oz","price":16},"15":{"label":"15 oz","price":19}},"colors":null,"defColor":null,"base":16},"tumbler-3":{"name":"Fourth Orbit Tumbler","db":"Tumbler","desc":"Seven rings around a dark core, with small planets caught mid-turn.","sizes":{"20":{"label":"20 oz","price":28},"30":{"label":"30 oz","price":34}},"colors":{"steel":"Steel","white":"White","black":"Black"},"defColor":"steel","base":28},"tumbler-6":{"name":"Monolith at Noon Tumbler","db":"Tumbler","desc":"One tall slab on a striped plain beneath a pale amber sun.","sizes":{"20":{"label":"20 oz","price":28},"30":{"label":"30 oz","price":34}},"colors":{"steel":"Steel","white":"White","black":"Black"},"defColor":"steel","base":28},"tumbler-7":{"name":"Evening Hills Tumbler","db":"Tumbler","desc":"The same rolling ground after dark, lit by a gold moon.","sizes":{"20":{"label":"20 oz","price":28},"30":{"label":"30 oz","price":34}},"colors":{"steel":"Steel","white":"White","black":"Black"},"defColor":"steel","base":28},"tumbler-8":{"name":"Salt Flats Tumbler","db":"Tumbler","desc":"Grey-blue ripples across a dry lakebed, with one warm band.","sizes":{"20":{"label":"20 oz","price":28},"30":{"label":"30 oz","price":34}},"colors":{"steel":"Steel","white":"White","black":"Black"},"defColor":"steel","base":28},"tumbler-11":{"name":"Terraces Tumbler","db":"Tumbler","desc":"Contour lines in orange and red, like rice terraces from above.","sizes":{"20":{"label":"20 oz","price":28},"30":{"label":"30 oz","price":34}},"colors":{"steel":"Steel","white":"White","black":"Black"},"defColor":"steel","base":28},"tumbler-12":{"name":"Pale Moon Tumbler","db":"Tumbler","desc":"A dusky pink sky, a tall dark slab and a quiet moon.","sizes":{"20":{"label":"20 oz","price":28},"30":{"label":"30 oz","price":34}},"colors":{"steel":"Steel","white":"White","black":"Black"},"defColor":"steel","base":28},"poster-1":{"name":"Dune Study Poster","db":"Poster","desc":"Four layers of low hills under a late sun, in warm sand and plum.","sizes":{"s":{"label":"Small","price":19},"m":{"label":"Medium","price":29},"l":{"label":"Large","price":45}},"colors":null,"defColor":null,"base":19},"poster-2":{"name":"Low Tide Poster","db":"Poster","desc":"Stacked bands of water in teal and deep blue, cut with pale foam.","sizes":{"s":{"label":"Small","price":19},"m":{"label":"Medium","price":29},"l":{"label":"Large","price":45}},"colors":null,"defColor":null,"base":19},"poster-3":{"name":"Fourth Orbit Poster","db":"Poster","desc":"Seven rings around a dark core, with small planets caught mid-turn.","sizes":{"s":{"label":"Small","price":19},"m":{"label":"Medium","price":29},"l":{"label":"Large","price":45}},"colors":null,"defColor":null,"base":19},"poster-4":{"name":"Quarter Turn Poster","db":"Poster","desc":"A twelve-cell grid of arcs, circles and half blocks in loud citrus.","sizes":{"s":{"label":"Small","price":19},"m":{"label":"Medium","price":29},"l":{"label":"Large","price":45}},"colors":null,"defColor":null,"base":19},"poster-5":{"name":"Ridge Lines Poster","db":"Poster","desc":"Topographic contours of an imaginary hill, drawn in three greens.","sizes":{"s":{"label":"Small","price":19},"m":{"label":"Medium","price":29},"l":{"label":"Large","price":45}},"colors":null,"defColor":null,"base":19},"poster-6":{"name":"Monolith at Noon Poster","db":"Poster","desc":"One tall slab on a striped plain beneath a pale amber sun.","sizes":{"s":{"label":"Small","price":19},"m":{"label":"Medium","price":29},"l":{"label":"Large","price":45}},"colors":null,"defColor":null,"base":19},"poster-7":{"name":"Evening Hills Poster","db":"Poster","desc":"The same rolling ground after dark, lit by a gold moon.","sizes":{"s":{"label":"Small","price":19},"m":{"label":"Medium","price":29},"l":{"label":"Large","price":45}},"colors":null,"defColor":null,"base":19},"poster-8":{"name":"Salt Flats Poster","db":"Poster","desc":"Grey-blue ripples across a dry lakebed, with one warm band.","sizes":{"s":{"label":"Small","price":19},"m":{"label":"Medium","price":29},"l":{"label":"Large","price":45}},"colors":null,"defColor":null,"base":19},"poster-9":{"name":"Rosette Poster","db":"Poster","desc":"Concentric rings in pink and plum that read like a cut flower.","sizes":{"s":{"label":"Small","price":19},"m":{"label":"Medium","price":29},"l":{"label":"Large","price":45}},"colors":null,"defColor":null,"base":19},"poster-10":{"name":"Block Party Poster","db":"Poster","desc":"The grid again, cooled down to sea greens and navy.","sizes":{"s":{"label":"Small","price":19},"m":{"label":"Medium","price":29},"l":{"label":"Large","price":45}},"colors":null,"defColor":null,"base":19},"poster-11":{"name":"Terraces Poster","db":"Poster","desc":"Contour lines in orange and red, like rice terraces from above.","sizes":{"s":{"label":"Small","price":19},"m":{"label":"Medium","price":29},"l":{"label":"Large","price":45}},"colors":null,"defColor":null,"base":19},"poster-12":{"name":"Pale Moon Poster","db":"Poster","desc":"A dusky pink sky, a tall dark slab and a quiet moon.","sizes":{"s":{"label":"Small","price":19},"m":{"label":"Medium","price":29},"l":{"label":"Large","price":45}},"colors":null,"defColor":null,"base":19},"metal-1":{"name":"Dune Study Metal Poster","db":"Metal Poster","desc":"Four layers of low hills under a late sun, in warm sand and plum.","sizes":{"s":{"label":"Small","price":27},"m":{"label":"Medium","price":39},"l":{"label":"Large","price":59}},"colors":null,"defColor":null,"base":27},"metal-2":{"name":"Low Tide Metal Poster","db":"Metal Poster","desc":"Stacked bands of water in teal and deep blue, cut with pale foam.","sizes":{"s":{"label":"Small","price":27},"m":{"label":"Medium","price":39},"l":{"label":"Large","price":59}},"colors":null,"defColor":null,"base":27},"metal-3":{"name":"Fourth Orbit Metal Poster","db":"Metal Poster","desc":"Seven rings around a dark core, with small planets caught mid-turn.","sizes":{"s":{"label":"Small","price":27},"m":{"label":"Medium","price":39},"l":{"label":"Large","price":59}},"colors":null,"defColor":null,"base":27},"metal-4":{"name":"Quarter Turn Metal Poster","db":"Metal Poster","desc":"A twelve-cell grid of arcs, circles and half blocks in loud citrus.","sizes":{"s":{"label":"Small","price":27},"m":{"label":"Medium","price":39},"l":{"label":"Large","price":59}},"colors":null,"defColor":null,"base":27},"metal-5":{"name":"Ridge Lines Metal Poster","db":"Metal Poster","desc":"Topographic contours of an imaginary hill, drawn in three greens.","sizes":{"s":{"label":"Small","price":27},"m":{"label":"Medium","price":39},"l":{"label":"Large","price":59}},"colors":null,"defColor":null,"base":27},"metal-6":{"name":"Monolith at Noon Metal Poster","db":"Metal Poster","desc":"One tall slab on a striped plain beneath a pale amber sun.","sizes":{"s":{"label":"Small","price":27},"m":{"label":"Medium","price":39},"l":{"label":"Large","price":59}},"colors":null,"defColor":null,"base":27},"metal-7":{"name":"Evening Hills Metal Poster","db":"Metal Poster","desc":"The same rolling ground after dark, lit by a gold moon.","sizes":{"s":{"label":"Small","price":27},"m":{"label":"Medium","price":39},"l":{"label":"Large","price":59}},"colors":null,"defColor":null,"base":27},"metal-8":{"name":"Salt Flats Metal Poster","db":"Metal Poster","desc":"Grey-blue ripples across a dry lakebed, with one warm band.","sizes":{"s":{"label":"Small","price":27},"m":{"label":"Medium","price":39},"l":{"label":"Large","price":59}},"colors":null,"defColor":null,"base":27},"metal-9":{"name":"Rosette Metal Poster","db":"Metal Poster","desc":"Concentric rings in pink and plum that read like a cut flower.","sizes":{"s":{"label":"Small","price":27},"m":{"label":"Medium","price":39},"l":{"label":"Large","price":59}},"colors":null,"defColor":null,"base":27},"metal-10":{"name":"Block Party Metal Poster","db":"Metal Poster","desc":"The grid again, cooled down to sea greens and navy.","sizes":{"s":{"label":"Small","price":27},"m":{"label":"Medium","price":39},"l":{"label":"Large","price":59}},"colors":null,"defColor":null,"base":27},"metal-11":{"name":"Terraces Metal Poster","db":"Metal Poster","desc":"Contour lines in orange and red, like rice terraces from above.","sizes":{"s":{"label":"Small","price":27},"m":{"label":"Medium","price":39},"l":{"label":"Large","price":59}},"colors":null,"defColor":null,"base":27},"metal-12":{"name":"Pale Moon Metal Poster","db":"Metal Poster","desc":"A dusky pink sky, a tall dark slab and a quiet moon.","sizes":{"s":{"label":"Small","price":27},"m":{"label":"Medium","price":39},"l":{"label":"Large","price":59}},"colors":null,"defColor":null,"base":27},"calendar-1":{"name":"Dune Study Calendar","db":"Calendar","desc":"Four layers of low hills under a late sun, in warm sand and plum.","sizes":{"wall":{"label":"Wall","price":24},"desk":{"label":"Desk","price":16}},"colors":null,"defColor":null,"base":16},"calendar-5":{"name":"Ridge Lines Calendar","db":"Calendar","desc":"Topographic contours of an imaginary hill, drawn in three greens.","sizes":{"wall":{"label":"Wall","price":24},"desk":{"label":"Desk","price":16}},"colors":null,"defColor":null,"base":16},"calendar-7":{"name":"Evening Hills Calendar","db":"Calendar","desc":"The same rolling ground after dark, lit by a gold moon.","sizes":{"wall":{"label":"Wall","price":24},"desk":{"label":"Desk","price":16}},"colors":null,"defColor":null,"base":16},"calendar-11":{"name":"Terraces Calendar","db":"Calendar","desc":"Contour lines in orange and red, like rice terraces from above.","sizes":{"wall":{"label":"Wall","price":24},"desk":{"label":"Desk","price":16}},"colors":null,"defColor":null,"base":16}}
JSON, true, 512, JSON_THROW_ON_ERROR);
    }
    return $c;
}

function bad(string $m): never
{
    throw new InvalidArgumentException($m);
}

function validate_order(array $in): array
{
    $name = $in['name'] ?? null;
    $email = $in['email'] ?? null;
    $items = $in['items'] ?? null;
    if (!is_string($name) || !is_string($email) || !is_array($items)) {
        bad('Malformed order');
    }

    $name = preg_replace('/[\x00-\x1F\x7F\s]+/u', ' ', $name);
    if ($name === null) {
        bad('Invalid name');
    }
    $name = trim($name);
    if (mb_strlen($name) < 2 || mb_strlen($name) > 100) {
        bad('Invalid name');
    }

    $email = strtolower(trim($email));
    if (strlen($email) > 254 || filter_var($email, FILTER_VALIDATE_EMAIL) === false) {
        bad('Invalid email');
    }

    if (count($items) < 1 || count($items) > 30) {
        bad('Invalid cart');
    }

    $cat = catalog();
    $lines = [];
    $total = 0;
    foreach ($items as $it) {
        if (!is_array($it)) {
            bad('Invalid item');
        }
        $pid = $it['pid'] ?? null;
        $size = $it['size'] ?? null;
        $qty = $it['qty'] ?? null;
        if (!is_string($pid) || !isset($cat[$pid])) {
            bad('Unknown product');
        }
        $p = $cat[$pid];
        if ((!is_string($size) && !is_int($size)) || !isset($p['sizes'][$size])) {
            bad('Invalid option');
        }
        if (!is_int($qty) || $qty < 1 || $qty > 20) {
            bad('Invalid quantity');
        }
        $color = null;
        if ($p['colors'] !== null) {
            $cid = $it['color'] ?? $p['defColor'];
            if ((!is_string($cid) && !is_int($cid)) || !isset($p['colors'][$cid])) {
                bad('Invalid color');
            }
            $color = (string) $p['colors'][$cid];
        }
        $unit = (int) $p['sizes'][$size]['price'];
        $total += $unit * $qty;
        $lines[] = [
            'pid' => $pid,
            'name' => (string) $p['name'],
            'db' => (string) $p['db'],
            'size' => (string) $p['sizes'][$size]['label'],
            'color' => $color,
            'qty' => $qty,
            'unit' => $unit,
        ];
    }
    return ['name' => $name, 'email' => $email, 'lines' => $lines, 'total' => $total];
}

function order_label(int $id): string
{
    return 'E626-' . str_pad((string) $id, 6, '0', STR_PAD_LEFT);
}

function save_order(array $cfg, array $o): string
{
    $dsn = sprintf(
        'pgsql:host=%s;port=%d;dbname=%s;sslmode=%s',
        $cfg['db_host'],
        (int) $cfg['db_port'],
        $cfg['db_name'],
        $cfg['db_sslmode'] ?? 'prefer'
    );
    $pdo = new PDO($dsn, $cfg['db_user'], $cfg['db_pass'], [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_EMULATE_PREPARES => false,
        PDO::ATTR_TIMEOUT => 5,
    ]);

    $pdo->beginTransaction();
    try {
        // Existing customers keep the name they first used; only the id is read back.
        $st = $pdo->prepare(
            'INSERT INTO customers (full_name, email) VALUES (:n, :e)
             ON CONFLICT (email) DO UPDATE SET email = EXCLUDED.email RETURNING id'
        );
        $st->execute([':n' => $o['name'], ':e' => $o['email']]);
        $customerId = (int) $st->fetchColumn();

        $st = $pdo->prepare('INSERT INTO orders (customer_id, status, total) VALUES (:c, :s, :t) RETURNING id');
        $st->execute([':c' => $customerId, ':s' => 'pending', ':t' => number_format($o['total'], 2, '.', '')]);
        $orderId = (int) $st->fetchColumn();

        // One catalog row per product type (e.g. "Mug"); the design, size and color are kept on the order line.
        $find = $pdo->prepare("SELECT id FROM products WHERE name = :n AND type = 'good' AND active ORDER BY id LIMIT 1");
        $ins = $pdo->prepare(
            'INSERT INTO order_items (order_id, product_id, quantity, unit_price, size, color, item_name)
             VALUES (:o, :p, :q, :u, :s, :c, :i)'
        );
        $ids = [];
        foreach ($o['lines'] as $l) {
            if (!isset($ids[$l['db']])) {
                $find->execute([':n' => $l['db']]);
                $pid = $find->fetchColumn();
                if ($pid === false) {
                    throw new RuntimeException('Product type missing from products table: ' . $l['db']);
                }
                $ids[$l['db']] = (int) $pid;
            }
            $ins->execute([
                ':o' => $orderId,
                ':p' => $ids[$l['db']],
                ':q' => $l['qty'],
                ':u' => number_format($l['unit'], 2, '.', ''),
                ':s' => $l['size'],
                ':c' => $l['color'],
                ':i' => $l['name'],
            ]);
        }
        $pdo->commit();
    } catch (Throwable $e) {
        if ($pdo->inTransaction()) {
            $pdo->rollBack();
        }
        throw $e;
    }
    return order_label($orderId);
}

function receipt_body(array $o, string $label, string $support): string
{
    $nl = "\r\n";
    $b = 'Hi ' . $o['name'] . ',' . $nl . $nl . 'Thanks for your order. Your order number is ' . $label . '.' . $nl . $nl;
    foreach ($o['lines'] as $l) {
        $opt = $l['size'] . ($l['color'] !== null ? ', ' . $l['color'] : '');
        $b .= $l['name'] . ' (' . $opt . ') x ' . $l['qty'] . '  $' . number_format($l['unit'] * $l['qty'], 2) . $nl;
    }
    $b .= $nl . 'Total: $' . number_format($o['total'], 2) . $nl . $nl;
    $b .= 'Questions about your order? Email ' . $support . ' with your order number and we will reply within one business day.' . $nl . $nl . 'Experiment 626' . $nl;
    return $b;
}

function send_receipt(array $cfg, array $o, string $label): bool
{
    ini_set('SMTP', (string) $cfg['smtp_host']);
    ini_set('smtp_port', (string) (int) $cfg['smtp_port']);
    ini_set('sendmail_from', (string) $cfg['mail_from']);
    $headers = [
        'From' => 'Experiment 626 <' . $cfg['mail_from'] . '>',
        'Reply-To' => (string) $cfg['support_email'],
        'MIME-Version' => '1.0',
        'Content-Type' => 'text/plain; charset=UTF-8',
    ];
    return @mail(
        $o['email'],
        'Your Experiment 626 receipt ' . $label,
        receipt_body($o, $label, (string) $cfg['support_email']),
        $headers
    );
}

function log_line(?array $cfg, string $m): void
{
    $f = $cfg['log_file'] ?? null;
    if (is_string($f) && $f !== '') {
        @error_log(date('c') . ' ' . $m . "\n", 3, $f);
    }
}

function reply(int $code, array $data): never
{
    http_response_code($code);
    echo json_encode($data);
    exit;
}

if (defined('E626_TEST')) {
    return;
}

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    reply(405, ['ok' => false]);
}
if (stripos($_SERVER['CONTENT_TYPE'] ?? '', 'application/json') !== 0) {
    reply(415, ['ok' => false]);
}
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin !== '') {
    $oHost = (string) parse_url($origin, PHP_URL_HOST);
    $oPort = parse_url($origin, PHP_URL_PORT);
    $oAuth = $oHost . ($oPort ? ':' . $oPort : '');
    if (strcasecmp($oAuth, $_SERVER['HTTP_HOST'] ?? '') !== 0) {
        reply(403, ['ok' => false]);
    }
}
$raw = file_get_contents('php://input', false, null, 0, 16385);
if ($raw === false || strlen($raw) > 16384) {
    reply(413, ['ok' => false]);
}
$in = json_decode($raw, true);
if (!is_array($in)) {
    reply(400, ['ok' => false]);
}

$cfg = null;
try {
    $cfg = require dirname(__DIR__) . DIRECTORY_SEPARATOR . 'config' . DIRECTORY_SEPARATOR . 'shop-config.php';
    $order = validate_order($in);
    $label = save_order($cfg, $order);
} catch (InvalidArgumentException $e) {
    reply(422, ['ok' => false, 'error' => 'Please check your order and try again.']);
} catch (Throwable $e) {
    log_line(is_array($cfg) ? $cfg : null, 'checkout failed: ' . get_class($e) . ': ' . $e->getMessage());
    reply(500, ['ok' => false, 'error' => 'We could not place your order.']);
}

$sent = false;
try {
    $sent = send_receipt($cfg, $order, $label);
} catch (Throwable $e) {
    log_line($cfg, 'receipt failed for ' . $label . ': ' . $e->getMessage());
}
if (!$sent) {
    log_line($cfg, 'receipt not sent for ' . $label);
}
reply(200, ['ok' => true, 'orderId' => $label, 'emailSent' => $sent]);
