<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Products</title>
</head>
<body>
    <div id="content">
        <h1>Search</h1>

        <p>Search below, or <a href="contact.html">contact us</a></p>

        <form action="products.php" method="post" name="searchForm">
            <input type="text" name="search" value="<?php echo @$_REQUEST['search']; ?>">
            <input type="submit" name="Search">
        </form><br>

        <table border="1">
            <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
            </tr>
            <tr>
                <td>Hammer</th>
                <td>9.99</td>
                <td>12</td>
            </tr>
        </table>
    </div>

    <ul>
        <li><a href="index.html">Back</a></li>
    </ul>

    <script src="https://code.jquery.com/jquery-1.11.3.min.js"></script>
    <script src="../src/n4s.js"></script>

    <script src="app.js"></script>
</body>
</html>
