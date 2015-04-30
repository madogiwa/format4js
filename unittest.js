/*
 * Copyright (c) 2011 Hidenori Sugiyama
 *
 * Unit Test of format4js
 *
 * Licensed under the MIT license.
 */

test('interfaces', function() {
    expect(4);

    equals( mdgw.format('%d', 5), jQuery.format('%d', 5) );
    notEqual( mdgw.format('%d', 5), jQuery.format('%d', -5) );
    equals( mdgw.format('%d', 5), '%d'.format(5) );
    equals( mdgw.format('%d', 5), String.format('%d', 5) );
});

test('no conversion', function() {
    expect(2);

    equals( jQuery.format('01234567890') , '01234567890' );
    equals( jQuery.format('10', 20) , '10' );
});

test('argument', function() {
    expect(3);

    equals( jQuery.format('%1$d %d %<d %1$d %d %<d', 1, 2, 3, 4), '1 1 1 1 2 2' );
    equals( jQuery.format('%d %% %d', 1, 2, 3), '1 % 2' );
    raises(function(){ jQuery.format('%<d', 1) });
});

test('b - boolean', function() {
    expect(8);

    equals( jQuery.format('%b', true), 'true' );
    var b = false;
    equals( jQuery.format('%b', b), 'false' );
    equals( jQuery.format('%b', null), 'false' );
    equals( jQuery.format('%b', 300), 'true' );
    equals( jQuery.format('%b', 'string') , 'true');

    // format
    equals( jQuery.format('%5b', true), ' true' );
    equals( jQuery.format('%-5b', true), 'true ' );

    // exception
    raises(function(){ jQuery.format('%#b', false); });
});

test('hH - hash code (not supported)', function() {
    expect(2);

    var obj = {};
    raises( function() { jQuery.format('%h', obj) } );
    raises( function() { jQuery.format('%H', obj) } );
});

test('sS - string', function() {
    expect(6);

    equals( jQuery.format('%s', 'hello'), 'hello' );
    equals( jQuery.format('%S', 'hello'), 'HELLO' );

    // format
    equals( jQuery.format('%7s', 'hello'), '  hello');
    equals( jQuery.format('%-7s', 'hello'), 'hello  ');

    // exception
    raises(function(){ jQuery.format('%#7s', 'hello'); });
    raises(function(){ jQuery.format('%-+'); });
});

test('cC - character', function() {
    expect(7);

    equals( jQuery.format('%c', 'h'), 'h' );
    equals( jQuery.format('%C', 'h'), 'H' );

    raises(function(){ jQuery.format('%C', 'hello'); });

    // format
    equals( jQuery.format('%5c', 'x'), '    x' );
    equals( jQuery.format('%-5c', 'x'), 'x    ' );

    // exception
    raises(function(){ jQuery.format('%#5c', 'x'); });
    raises(function(){ jQuery.format('%c', 'hello'); });
});

test('d - decimal integer', function() {
    expect(16);

    equals( jQuery.format('%d', 10), '10' );
    equals( jQuery.format('%03d', 10), '010' );

    // illegal format conversion
    // raises(function(){ jQuery.format('%d', 10.5); });
    // original behaviour
    equals( jQuery.format('%d', 10.5), '10' );

    // format
    equals( jQuery.format('%5d', 10), '   10' );
    equals( jQuery.format('%-5d', 10), '10   ' );
    raises(function(){ jQuery.format('%#5d', 10); });

    // signPlus
    equals( jQuery.format('%+5d', 10), '  +10' );
    equals( jQuery.format('%+5d', -10), '  -10' );

    // singSpace
    equals( jQuery.format('% -5d', 10), ' 10  ' );
    equals( jQuery.format('% -5d', -10), '-10  ' );

    // zeroPadding
    equals( jQuery.format('%05d', 10), '00010' );

    // groupSeparator
    equals( jQuery.format('%,5d', 10), '   10' );
    equals( jQuery.format('%,6d', 1000), ' 1,000' );

    // surroundNegative
    equals( jQuery.format('%(5d', 10), '   10' );
    equals( jQuery.format('%(6d', -10), '  (10)' );

    // combination
    raises( function() { jQuery.format('%+ d', 10) } );

});

test('o - octal integer', function() {
    expect(10);

    equals( jQuery.format('%o', 10), '12' );

    // format
    equals( jQuery.format('%5o', 10), '   12' );
    equals( jQuery.format('%-5o', 10), '12   ' );
    equals( jQuery.format('%#5o', 10), '  012' );
    equals( jQuery.format('%#5o', 0), '   00' );

    // zeroPadding
    equals( jQuery.format('%05o', 10), '00012' );

    // signPlus
    raises(function(){ jQuery.format('%+5o', 10); });

    // singSpace
    raises(function(){ jQuery.format('% -5o', 10); });

    // groupSeparator
    raises(function(){ jQuery.format('%,5o', 10); });

    // surroundNegative
    raises(function(){ jQuery.format('%(5o', 10); });

});

test('xX - hexadecimal integer', function() {
    expect(11);

    equals( jQuery.format('%x', 30), '1e' );
    equals( jQuery.format('%X', 30), '1E' );

    // format
    equals( jQuery.format('%5x', 30), '   1e' );
    equals( jQuery.format('%-5x', 30), '1e   ' );
    equals( jQuery.format('%#5x', 30), ' 0x1e' );
    equals( jQuery.format('%#5x', 0), '  0x0' );

    // signPlus
    raises(function(){ jQuery.format('%+5x', 10); });

    // singSpace
    raises(function(){ jQuery.format('% -5x', 10); });

    // zeroPadding
    equals( jQuery.format('%05x', 10), '0000a' );

    // groupSeparator
    raises(function(){ jQuery.format('%,5x', 10); });

    // surroundNegative
    raises(function(){ jQuery.format('%(5x', 10); });

});

test('eE - decimal number in computerized scientific notation', function() {
    expect(11);

    equals( jQuery.format('%e', 1000.0), '1.000000e+03' );
    equals( jQuery.format('%E', 1000.0), '1.000000E+03' );

    // format
    equals( jQuery.format('%15e', 1000.0), '   1.000000e+03' );
    equals( jQuery.format('%-15e', 1000.0), '1.000000e+03   ' );
    equals( jQuery.format('%#16e', 1000.0), '    1.000000e+03' );
    equals( jQuery.format('%#16e', 1000.5), '    1.000500e+03' );

    // signPlus
    equals( jQuery.format("%+15e", 1000.0), "  +1.000000e+03" );

    // singSpace
    equals( jQuery.format("% -15e", 1000.0), " 1.000000e+03  " );

    // zeroPadding
    equals( jQuery.format("%015e", 1000.0), "0001.000000e+03" );

    // groupSeparator
    raises(function(){ jQuery.format("%,15e", 1000.0); });

    // surroundNegative
    equals( jQuery.format("%(15e", -1000.0), " (1.000000e+03)" );

});

test('f - float', function() {
    expect(23);

    equals( jQuery.format('%f', 10.5), '10.500000' );
    equals( jQuery.format('%f', -10.5), '-10.500000' );
    equals( jQuery.format('%03.3f', 10.25678), '10.257' );

    // float rounding issue
    equals( jQuery.format('%03.2f', 10.025678), '10.03' );
    equals( jQuery.format('%03.2f', 10.085678), '10.09' );
    equals( jQuery.format('%03.2f', 10.0000085678), '10.00' );
	
	equals( jQuery.format('%.0f', 10.0000085678), '10' );
	equals( jQuery.format('%.0f', 10.9), '11' );
	equals( jQuery.format('%.1f', 10.09), '10.1');
	equals( jQuery.format('%.1f', 10.99), '11.0');
	
	equals( jQuery.format('%.0f', 10), '10');
	equals( jQuery.format('%.0f', 10.0000), '10');
	equals( jQuery.format('%.0f', 10.00001), '10');
	

    // format
    equals( jQuery.format('%10f', 10.5), ' 10.500000' );
    equals( jQuery.format('%-10f', 10.5), '10.500000 ' );

    // alternative form
    equals( jQuery.format('%#10f', 10.5), ' 10.500000' );
    equals( jQuery.format('%10.0f', 12345.0), '     12345' );
    equals( jQuery.format('%#10.0f', 12345.0), '    12345.' );

    // signPlus
    equals( jQuery.format("%+10f", 10.5), "+10.500000" );

    // singSpace
    equals( jQuery.format("% -12f", 10.5), " 10.500000  " );

    // zeroPadding
    equals( jQuery.format("%012f", 10.5), "00010.500000" );

    // groupSeparator
    equals( jQuery.format("%,14f", 1000.5), "  1,000.500000" );

    // surroundNegative
    equals( jQuery.format("%(12f", -10.5), " (10.500000)" );

});

test('gG - computerized scientific notation or decimal format', function() {
    expect(13);

    equals( jQuery.format('%g', 3.14159), '3.14159' );
    equals( jQuery.format('%.9G', 3.14159), '3.14159000' );

    equals( jQuery.format("%g", 100000.1), "100000" );
    equals( jQuery.format("%g", 1000000000.1), "1.00000e+09" );
    equals( jQuery.format("%.10g", 1000000000.1), "1000000000" );

    // format
    equals( jQuery.format('%8g', 3.14159), ' 3.14159' );
    equals( jQuery.format('%-8g', 3.14159), '3.14159 ' );

    raises(function(){ jQuery.format('%#8g', 3.14159); });

    // signPlus
    equals( jQuery.format("%+10g", 3.14159), "  +3.14159" );

    // singSpace
    equals( jQuery.format("% -10g", 3.14159), " 3.14159  " );

    // zeroPadding
    equals( jQuery.format("%010g", 3.14159), "0003.14159" );

    // groupSeparator
    equals( jQuery.format("%,10g", 3000.14159), "  3,000.14" );

    // surroundNegative
    equals( jQuery.format("%(10g", -3.14159), " (3.14159)" );

});

test('aA - hexadecimal floating-point number', function() {
    expect(11);

    equals( jQuery.format('%a', 3.14159), '0x1.921f9f01b866ep1' );
    equals( jQuery.format('%A', 3.14159), '0X1.921F9F01B866EP1' );

    // format
    equals( jQuery.format('%20a', 3.14159), ' 0x1.921f9f01b866ep1' );
    equals( jQuery.format('%-20a', 3.14159), '0x1.921f9f01b866ep1 ' );
    equals( jQuery.format('%#20a', 3.14159), ' 0x1.921f9f01b866ep1' );
    equals( jQuery.format('%#10a', 3.), '   0x1.8p1' );

    // signPlus
    equals( jQuery.format("%+22a", 3.14159), "  +0x1.921f9f01b866ep1" );

    // singSpace
    equals( jQuery.format("% -22a", 3.14159), " 0x1.921f9f01b866ep1  " );

    // zeroPadding
    equals( jQuery.format("%022a", 3.14159), "0x0001.921f9f01b866ep1" );

    // groupSeparator
    raises(function(){ jQuery.format("%,22a", 3.14159); });

    // surroundNegative
    raises(function(){ jQuery.format("%(22a", -3.14159); });

});

test('tT - date and time (foundamental)', function() {
    expect(18);

    var date = new Date(1981, 8, 2, 4, 5, 6, 98);
    var date2 = new Date(1982, 11, 5, 14, 15, 6, 98);

    equals( jQuery.format('%tH', date), '04' );
    equals( jQuery.format('%tI', date), '04' );
    equals( jQuery.format('%tI', date2), '02' );
    equals( jQuery.format('%tk', date), '4' );
    equals( jQuery.format('%tl', date), '4' );
    equals( jQuery.format('%tl', date2), '2' );
    equals( jQuery.format('%tM', date), '05' );
    equals( jQuery.format('%tS', date), '06' );

    equals( jQuery.format('%tL', date), '098' );

    // original behaviour - timezone is not supported
    raises(function(){ jQuery.format('%tN', date) });

    equals( jQuery.format('%tp', date), 'am' );
    equals( jQuery.format('%Tp', date2), 'PM' );

    equals( jQuery.format('%tz', date), '+0900' );

    // original behaviour - timezone is not supported
    raises(function(){ jQuery.format('%tZ', date) });

    equals( jQuery.format('%ts', date), '368219106' );
    equals( jQuery.format('%tQ', date), '368219106098' );

    // format
    equals( jQuery.format('%5tH', date), '   04' );
    equals( jQuery.format('%-5tH', date), '04   ' );
});

test('tT - date and time (formatting)', function() {
    expect(14);

    var date = new Date(1981, 8, 2, 4, 5, 6, 98);
    equals( jQuery.format('%tB', date), 'September' );
    equals( jQuery.format('%tb', date), 'Sep' );
    equals( jQuery.format('%th', date), 'Sep' );

    equals( jQuery.format('%tA', date), 'Wednesday' );
    equals( jQuery.format('%ta', date), 'Wed' );

    equals( jQuery.format('%tC', date), '19' );
    equals( jQuery.format('%tY', date), '1981' );
    equals( jQuery.format('%ty', date), '81' );
    equals( jQuery.format('%tj', date), '245' );
    equals( jQuery.format('%tm', date), '09' );

    equals( jQuery.format('%td', date), '02' );
    equals( jQuery.format('%te', date), '2' );

    // format
    equals( jQuery.format('%5tb', date), '  Sep' );
    equals( jQuery.format('%-5tb', date), 'Sep  ' );
});

test('tT - date and time (composition)', function() {
    expect(9);

    var date = new Date(1981, 8, 2, 4, 5, 6, 98);
    equals( jQuery.format('%tR', date), '04:05' );
    equals( jQuery.format('%tT', date), '04:05:06' );
    equals( jQuery.format('%tr', date), '04:05:06 AM' );
    equals( jQuery.format('%Tr', date), '04:05:06 AM' );
    equals( jQuery.format('%tD', date), '09/02/81' );
    equals( jQuery.format('%tF', date), '1981-09-02' );

    // original behaviour - timezone is not supported
    raises(function(){ jQuery.format('%tc', date) });

    // format
    equals( jQuery.format('%7tR', date), '  04:05' );
    equals( jQuery.format('%-7tR', date), '04:05  ' );
});

test('% - literal', function() {
    expect(4);

    equals( jQuery.format('%%'), '%' );
    equals( jQuery.format('%%', 10), '%' );

    // format
    equals( jQuery.format('%5%', true), '%' );
    equals( jQuery.format('%-5%', 10), '%' );
});

test('n - line separator', function() {
    expect(4);

    equals( jQuery.format('%n'), '\n' );
    equals( jQuery.format('%n', 10), '\n' );

    // format
    raises(function(){ jQuery.format('%5n', true); });
    raises(function(){ jQuery.format('%-5n', 10); });
});

test('j - JSON (original)', function() {
    expect(3);

    var obj = {
        id: 10,
        name: 'aaa'
    };
    equals( jQuery.format('%j', obj), '{"id":10,"name":"aaa"}' );

    // format
    equals( jQuery.format('%24j', obj), '  {"id":10,"name":"aaa"}' );
    equals( jQuery.format('%-24j', obj), '{"id":10,"name":"aaa"}  ' );
});
