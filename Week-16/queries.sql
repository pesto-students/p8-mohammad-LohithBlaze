SELECT ITEMNO, DESCRIPTION, WEIGHT
FROM ITEMS
WHERE WEIGHT = (SELECT MIN(WEIGHT)
FROM ITEMS);


SELECT WNAME
FROM WAREHOUSES
WHERE LOCATION = 'Pune';


SELECT I.ITEMNO, I.DESCRIPTION, I.WEIGHT, I.COST, O.ODATE, O.ORDERED_QUANTITY
FROM CUSTOMER C
    JOIN ORDERS O ON C.CNO = O.CNO
    JOIN ORDER_ITEMS OI ON O.ONO = OI.ONO
    JOIN ITEMS I ON OI.ITEMNO = I.ITEMNO
WHERE C.CNAME = 'Mr. Patil';


SELECT W.WID, W.WNAME, COUNT(*) AS NUM_STORES
FROM WAREHOUSES W
    JOIN STORES S ON W.WID = S.WID
GROUP BY W.WID, W.WNAME
ORDER BY NUM_STORES DESC
LIMIT 1;


SELECT I
.ITEMNO, I.DESCRIPTION, COUNT
(*) AS NUM_ORDERS
FROM ITEMS I
    JOIN ORDERS O ON O.ITEMNO = I.ITEMNO
GROUP BY I.ITEMNO, I.DESCRIPTION
ORDER BY NUM_ORDERS ASC
LIMIT 1;


SELECT C.CNO, C.CNAME, O.ONO, O.ODATE, I.ITEMNO, I.DESCRIPTION, I.WEIGHT, I.COST
FROM CUSTOMER C
    JOIN ORDERS O ON C.CNO = O.CNO
    JOIN ITEMS I ON O.ITEMNO = I.ITEMNO
ORDER BY C.CNO, O.ONO;


