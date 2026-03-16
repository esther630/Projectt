 function makePayment(){
      PaychanguCheckout({
        "public_key": "PUB-TEST-bQNIEHiRnn0JN8xQ2GMVawXuVuG8pRfG",
        "tx_ref": '' + Math.floor((Math.random() * 1000000000) + 1),
        "amount": 1000,
        "currency": "MWK",
        "callback_url": "https://example.com/callbackurl",
        "return_url": "https://example.com/returnurl",
        "customer":{
          "email": "yourmail@example.com",
          "first_name":"Mac",
          "last_name":"Phiri",
        },
        "customization": {
          "title": "Test Payment",
          "description": "Payment Description",
        },
        "meta": {
          "uuid": "uuid",
          "response": "Response"
        }
      });
    }