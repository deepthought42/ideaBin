


<table border="1">
<?php
$start_num = 1;
$end_num = 20;
print ("<tr>");
print("<th>0</th>");







for ($count_num1 = $start_num; 
	$count_num1 <= $end_num;
	$count_num1++)
	print ("<th>$count_num1</th>");
	print ("</tr>");

for ($count_num1 = $start_num; 
	$count_num1 <= $end_num;
	$count_num1++)
{
	print("<tr><th>$count_num1</th>");
	
	for ($count_num2 = $start_num;
		$count_num2 <= $end_num;
		$count_num2++)
{
	$result = $count_num1 * $count_num2;
	print("<td>$result</td>");
}
	print("<tr>");
}
	


?>
</table>