<?php

require_once 'vendor/autoload.php';

use GuzzleHttp\Client;

$client = new Client();

$response = $client->request('GET', 'http://www.omdbapi.com', [
  'query' => [
    'apikey' => '768264cb',
    's' => 'Detective Conan'
  ]
]);

$result = json_decode($response->getBody()->getContents(), true);

?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>List Movie</title>
</head>

<body>
  <?php foreach ($result['Search'] as $data) : ?>
    <ul>
      <li><?= $data['Title'] ?></li>
      <li><?= $data['Year'] ?></li>
      <li><?= $data['Type'] ?></li>
    </ul>
  <?php endforeach; ?>
</body>

</html>