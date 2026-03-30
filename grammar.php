<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data["text"]) || empty(trim($data["text"]))) {
    echo json_encode(["error" => "No input text provided"]);
    exit;
}

$apiKey = "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";

$payload = json_encode([
    "model" => "meta-llama/Llama-3.1-8B-Instruct:cerebras", // More reliable chat model
    "messages" => [
        [
            "role" => "system",
            "content" => "You are a grammar and writing assistant. Highlight where the user needs improvement and return only the improved text, nothing else. Do not provide different meaning just fix the grammar only"
        ],
        [
            "role" => "user",
            "content" => $data["text"]
        ]
    ],
    "max_tokens" => 512 // Required — without this some models refuse or hang
]);

$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, "https://router.huggingface.co/v1/chat/completions");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "Authorization: Bearer $apiKey",
    "Content-Type: application/json"
]);
curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
curl_setopt($ch, CURLOPT_TIMEOUT, 30); // Prevent hanging requests

$response = curl_exec($ch);

if (curl_errno($ch)) {
    echo json_encode(["error" => curl_error($ch)]);
    curl_close($ch);
    exit;
}

$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

// Forward non-200 responses with a clear error
if ($httpCode !== 200) {
    $decoded = json_decode($response, true);
    $message = $decoded["error"]["message"] ?? "HuggingFace API error (HTTP $httpCode)";
    echo json_encode(["error" => $message]);
    exit;
}

echo $response;
exit;
?>
