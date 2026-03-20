
<!doctype html>
<html>
<body>


<?php if ($_SERVER["REQUEST_METHOD"] === "POST"): ?>
    
<script src="https://in.paychangu.com/js/popup.js"></script>

<script>
PaychanguCheckout({
  "public_key": "PUB-TEST-bQNIEHiRnn0JN8xQ2GMVawXuVuG8pRfG",
  "tx_ref": "<?php echo $tx_ref; ?>",
  "amount": <?php echo $amount; ?>,
  "currency": "MWK",
  "callback_url": "https://example.com/callbackurl",
  "return_url": "https://example.com/returnurl",
  "customer": {
    "email": "<?php echo $email; ?>",
    "first_name": "<?php echo $ful_name; ?>",
    
  },
  "customization": {
    "title": "Checkout Payment",
    "description": "Order payment"
  }
});
</script>

<?php endif; ?>

</body>
</html>

   try {
      const url = "http://localhost/project/PHP/reg_writer.php";

      const response = await axios.post(url, {
        name,
        email,
        password,
        bio: formData.bio
      });

      const data = response.data;

      if (data.success) {
        alert("Registration successful!");
        window.location.href ="/";
      } else {
        alert("Registration failed: " + data.message);
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred during registration.");
    }
  }
};

