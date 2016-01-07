/*
 * Copyright (c) 2011 Hidenori Sugiyama
 *
 * Unit Test of format4js
 *
 * Licensed under the MIT license.
 */

test('interfaces', function() {
    expect(4);

    equal( mdgw.format('%d', 5), mdgw.format('%d', 5) );
    notEqual( mdgw.format('%d', 5), mdgw.format('%d', -5) );
    equal( mdgw.format('%d', 5), '%d'.format(5) );
    equal( mdgw.format('%d', 5), String.format('%d', 5) );
});

test('no conversion', function() {
    expect(2);

    equal( mdgw.format('01234567890') , '01234567890' );
    equal( mdgw.format('10', 20) , '10' );
});

test('argument', function() {
    expect(3);

    equal( mdgw.format('%1$d %d %<d %1$d %d %<d', 1, 2, 3, 4), '1 1 1 1 2 2' );
    equal( mdgw.format('%d %% %d', 1, 2, 3), '1 % 2' );
    raises(function(){ mdgw.format('%<d', 1) });
});

test('b - boolean', function() {
    expect(8);

    equal( mdgw.format('%b', true), 'true' );
    var b = false;
    equal( mdgw.format('%b', b), 'false' );
    equal( mdgw.format('%b', null), 'false' );
    equal( mdgw.format('%b', 300), 'true' );
    equal( mdgw.format('%b', 'string') , 'true');

    // format
    equal( mdgw.format('%5b', true), ' true' );
    equal( mdgw.format('%-5b', true), 'true ' );

    // exception
    raises(function(){ mdgw.format('%#b', false); });
});

test('hH - hash code (not supported)', function() {
    expect(2);

    var obj = {};
    raises( function() { mdgw.format('%h', obj) } );
    raises( function() { mdgw.format('%H', obj) } );
});

test('sS - string', function() {
    expect(6);

    equal( mdgw.format('%s', 'hello'), 'hello' );
    equal( mdgw.format('%S', 'hello'), 'HELLO' );

    // format
    equal( mdgw.format('%7s', 'hello'), '  hello');
    equal( mdgw.format('%-7s', 'hello'), 'hello  ');

    // exception
    raises(function(){ mdgw.format('%#7s', 'hello'); });
    raises(function(){ mdgw.format('%-+'); });
});

test('cC - character', function() {
    expect(7);

    equal( mdgw.format('%c', 'h'), 'h' );
    equal( mdgw.format('%C', 'h'), 'H' );

    raises(function(){ mdgw.format('%C', 'hello'); });

    // format
    equal( mdgw.format('%5c', 'x'), '    x' );
    equal( mdgw.format('%-5c', 'x'), 'x    ' );

    // exception
    raises(function(){ mdgw.format('%#5c', 'x'); });
    raises(function(){ mdgw.format('%c', 'hello'); });
});

test('d - decimal integer', function() {
    expect(16);

    equal( mdgw.format('%d', 10), '10' );
    equal( mdgw.format('%03d', 10), '010' );

    // illegal format conversion
    // raises(function(){ mdgw.format('%d', 10.5); });
    // original behaviour
    equal( mdgw.format('%d', 10.5), '10' );

    // format
    equal( mdgw.format('%5d', 10), '   10' );
    equal( mdgw.format('%-5d', 10), '10   ' );
    raises(function(){ mdgw.format('%#5d', 10); });

    // signPlus
    equal( mdgw.format('%+5d', 10), '  +10' );
    equal( mdgw.format('%+5d', -10), '  -10' );

    // singSpace
    equal( mdgw.format('% -5d', 10), ' 10  ' );
    equal( mdgw.format('% -5d', -10), '-10  ' );

    // zeroPadding
    equal( mdgw.format('%05d', 10), '00010' );

    // groupSeparator
    equal( mdgw.format('%,5d', 10), '   10' );
    equal( mdgw.format('%,6d', 1000), ' 1,000' );

    // surroundNegative
    equal( mdgw.format('%(5d', 10), '   10' );
    equal( mdgw.format('%(6d', -10), '  (10)' );

    // combination
    raises( function() { mdgw.format('%+ d', 10) } );

});

test('o - octal integer', function() {
    expect(10);

    equal( mdgw.format('%o', 10), '12' );

    // format
    equal( mdgw.format('%5o', 10), '   12' );
    equal( mdgw.format('%-5o', 10), '12   ' );
    equal( mdgw.format('%#5o', 10), '  012' );
    equal( mdgw.format('%#5o', 0), '   00' );

    // zeroPadding
    equal( mdgw.format('%05o', 10), '00012' );

    // signPlus
    raises(function(){ mdgw.format('%+5o', 10); });

    // singSpace
    raises(function(){ mdgw.format('% -5o', 10); });

    // groupSeparator
    raises(function(){ mdgw.format('%,5o', 10); });

    // surroundNegative
    raises(function(){ mdgw.format('%(5o', 10); });

});

test('xX - hexadecimal integer', function() {
    expect(11);

    equal( mdgw.format('%x', 30), '1e' );
    equal( mdgw.format('%X', 30), '1E' );

    // format
    equal( mdgw.format('%5x', 30), '   1e' );
    equal( mdgw.format('%-5x', 30), '1e   ' );
    equal( mdgw.format('%#5x', 30), ' 0x1e' );
    equal( mdgw.format('%#5x', 0), '  0x0' );

    // signPlus
    raises(function(){ mdgw.format('%+5x', 10); });

    // singSpace
    raises(function(){ mdgw.format('% -5x', 10); });

    // zeroPadding
    equal( mdgw.format('%05x', 10), '0000a' );

    // groupSeparator
    raises(function(){ mdgw.format('%,5x', 10); });

    // surroundNegative
    raises(function(){ mdgw.format('%(5x', 10); });

});

test('eE - decimal number in computerized scientific notation', function() {
    expect(15);

    equal( mdgw.format('%e', 1000.0), '1.000000e+03' );
    equal( mdgw.format('%E', 1000.0), '1.000000E+03' );

    equal( mdgw.format('%.0e', 10.0000085678), '1e+01' );
    equal( mdgw.format('%.0e', 10.9), '1e+01' );
    equal( mdgw.format('%.1e', 10.09), '1.0e+01');
    equal( mdgw.format('%.1e', 10.99), '1.1e+01');

    // format
    equal( mdgw.format('%15e', 1000.0), '   1.000000e+03' );
    equal( mdgw.format('%-15e', 1000.0), '1.000000e+03   ' );
    equal( mdgw.format('%#16e', 1000.0), '    1.000000e+03' );
    equal( mdgw.format('%#16e', 1000.5), '    1.000500e+03' );

    // signPlus
    equal( mdgw.format("%+15e", 1000.0), "  +1.000000e+03" );

    // singSpace
    equal( mdgw.format("% -15e", 1000.0), " 1.000000e+03  " );

    // zeroPadding
    equal( mdgw.format("%015e", 1000.0), "0001.000000e+03" );

    // groupSeparator
    raises(function(){ mdgw.format("%,15e", 1000.0); });

    // surroundNegative
    equal( mdgw.format("%(15e", -1000.0), " (1.000000e+03)" );

});

test('f - float', function() {
    expect(23);

    equal( mdgw.format('%f', 10.5), '10.500000' );
    equal( mdgw.format('%f', -10.5), '-10.500000' );
    equal( mdgw.format('%03.3f', 10.25678), '10.257' );

    // float rounding issue
    equal( mdgw.format('%03.2f', 10.025678), '10.03' );
    equal( mdgw.format('%03.2f', 10.085678), '10.09' );
    equal( mdgw.format('%03.2f', 10.0000085678), '10.00' );

    equal( mdgw.format('%.0f', 10.0000085678), '10' );
    equal( mdgw.format('%.0f', 10.9), '11' );
    equal( mdgw.format('%.1f', 10.09), '10.1');
    equal( mdgw.format('%.1f', 10.99), '11.0');

    equal( mdgw.format('%.0f', 10), '10');
    equal( mdgw.format('%.0f', 10.0000), '10');
    equal( mdgw.format('%.0f', 10.00001), '10');

    // format
    equal( mdgw.format('%10f', 10.5), ' 10.500000' );
    equal( mdgw.format('%-10f', 10.5), '10.500000 ' );

    // alternative form
    equal( mdgw.format('%#10f', 10.5), ' 10.500000' );
    equal( mdgw.format('%10.0f', 12345.0), '     12345' );
    equal( mdgw.format('%#10.0f', 12345.0), '    12345.' );

    // signPlus
    equal( mdgw.format("%+10f", 10.5), "+10.500000" );

    // singSpace
    equal( mdgw.format("% -12f", 10.5), " 10.500000  " );

    // zeroPadding
    equal( mdgw.format("%012f", 10.5), "00010.500000" );

    // groupSeparator
    equal( mdgw.format("%,14f", 1000.5), "  1,000.500000" );

    // surroundNegative
    equal( mdgw.format("%(12f", -10.5), " (10.500000)" );

});

test('gG - computerized scientific notation or decimal format', function() {
    expect(21);

    equal( mdgw.format('%g', 3.14159), '3.14159' );
    equal( mdgw.format('%.9G', 3.14159), '3.14159000' );

    equal( mdgw.format("%g", 100000.1), "100000" );
    equal( mdgw.format("%g", 1000000000.1), "1.00000e+09" );
    equal( mdgw.format("%.10g", 1000000000.1), "1000000000" );

    equal( mdgw.format('%.1g', 10000.1), '1e+04' );
    equal( mdgw.format('%.2g', 10000.1), '1.0e+04' );

    equal( mdgw.format('%.4g', 9999), '9999' );
    equal( mdgw.format('%.4g', 10000), '1.000e+04' );
    equal( mdgw.format('%.4g', 0.0001), '0.0001000' );
    equal( mdgw.format('%.4g', 0.00009), '9.000e-05' );

    equal( mdgw.format('%.0g', 1.9), '2' );
    equal( mdgw.format('%.1g', 1.9), '2' );

    // format
    equal( mdgw.format('%8g', 3.14159), ' 3.14159' );
    equal( mdgw.format('%-8g', 3.14159), '3.14159 ' );

    raises(function(){ mdgw.format('%#8g', 3.14159); });

    // signPlus
    equal( mdgw.format("%+10g", 3.14159), "  +3.14159" );

    // singSpace
    equal( mdgw.format("% -10g", 3.14159), " 3.14159  " );

    // zeroPadding
    equal( mdgw.format("%010g", 3.14159), "0003.14159" );

    // groupSeparator
    equal( mdgw.format("%,10g", 3000.14159), "  3,000.14" );

    // surroundNegative
    equal( mdgw.format("%(10g", -3.14159), " (3.14159)" );

});

test('aA - hexadecimal floating-point number', function() {
    expect(11);

    equal( mdgw.format('%a', 3.14159), '0x1.921f9f01b866ep1' );
    equal( mdgw.format('%A', 3.14159), '0X1.921F9F01B866EP1' );

    // format
    equal( mdgw.format('%20a', 3.14159), ' 0x1.921f9f01b866ep1' );
    equal( mdgw.format('%-20a', 3.14159), '0x1.921f9f01b866ep1 ' );
    equal( mdgw.format('%#20a', 3.14159), ' 0x1.921f9f01b866ep1' );
    equal( mdgw.format('%#10a', 3.), '   0x1.8p1' );

    // signPlus
    equal( mdgw.format("%+22a", 3.14159), "  +0x1.921f9f01b866ep1" );

    // singSpace
    equal( mdgw.format("% -22a", 3.14159), " 0x1.921f9f01b866ep1  " );

    // zeroPadding
    equal( mdgw.format("%022a", 3.14159), "0x0001.921f9f01b866ep1" );

    // groupSeparator
    raises(function(){ mdgw.format("%,22a", 3.14159); });

    // surroundNegative
    raises(function(){ mdgw.format("%(22a", -3.14159); });

});

test('tT - date and time (foundamental)', function() {
    expect(18);

    var offset = new Date().getTimezoneOffset();

    var date = new Date(1981, 8, 2, 4, 5, 6, 98);
    var date2 = new Date(1982, 11, 5, 14, 15, 6, 98);

    equal( mdgw.format('%tH', date), '04' );
    equal( mdgw.format('%tI', date), '04' );
    equal( mdgw.format('%tI', date2), '02' );
    equal( mdgw.format('%tk', date), '4' );
    equal( mdgw.format('%tl', date), '4' );
    equal( mdgw.format('%tl', date2), '2' );
    equal( mdgw.format('%tM', date), '05' );
    equal( mdgw.format('%tS', date), '06' );

    equal( mdgw.format('%tL', date), '098' );

    // original behaviour - timezone is not supported
    raises(function(){ mdgw.format('%tN', date) });

    equal( mdgw.format('%tp', date), 'am' );
    equal( mdgw.format('%Tp', date2), 'PM' );

    ok( mdgw.format('%tz', date).match(/^[+-][01]\d\d\d$/) );

    // original behaviour - timezone is not supported
    raises(function(){ mdgw.format('%tZ', date) });

    equal( mdgw.format('%ts', date), (368251506 + offset * 60).toString() );
    equal( mdgw.format('%tQ', date), (368251506098 + offset * 60 * 1000).toString() );

    // format
    equal( mdgw.format('%5tH', date), '   04' );
    equal( mdgw.format('%-5tH', date), '04   ' );
});

test('tT - date and time (formatting)', function() {
    expect(14);

    var date = new Date(1981, 8, 2, 4, 5, 6, 98);
    equal( mdgw.format('%tB', date), 'September' );
    equal( mdgw.format('%tb', date), 'Sep' );
    equal( mdgw.format('%th', date), 'Sep' );

    equal( mdgw.format('%tA', date), 'Wednesday' );
    equal( mdgw.format('%ta', date), 'Wed' );

    equal( mdgw.format('%tC', date), '19' );
    equal( mdgw.format('%tY', date), '1981' );
    equal( mdgw.format('%ty', date), '81' );
    equal( mdgw.format('%tj', date), '245' );
    equal( mdgw.format('%tm', date), '09' );

    equal( mdgw.format('%td', date), '02' );
    equal( mdgw.format('%te', date), '2' );

    // format
    equal( mdgw.format('%5tb', date), '  Sep' );
    equal( mdgw.format('%-5tb', date), 'Sep  ' );
});

test('tT - date and time (composition)', function() {
    expect(9);

    var date = new Date(1981, 8, 2, 4, 5, 6, 98);
    equal( mdgw.format('%tR', date), '04:05' );
    equal( mdgw.format('%tT', date), '04:05:06' );
    equal( mdgw.format('%tr', date), '04:05:06 AM' );
    equal( mdgw.format('%Tr', date), '04:05:06 AM' );
    equal( mdgw.format('%tD', date), '09/02/81' );
    equal( mdgw.format('%tF', date), '1981-09-02' );

    // original behaviour - timezone is not supported
    raises(function(){ mdgw.format('%tc', date) });

    // format
    equal( mdgw.format('%7tR', date), '  04:05' );
    equal( mdgw.format('%-7tR', date), '04:05  ' );
});

test('% - literal', function() {
    expect(4);

    equal( mdgw.format('%%'), '%' );
    equal( mdgw.format('%%', 10), '%' );

    // format
    equal( mdgw.format('%5%', true), '%' );
    equal( mdgw.format('%-5%', 10), '%' );
});

test('n - line separator', function() {
    expect(4);

    equal( mdgw.format('%n'), '\n' );
    equal( mdgw.format('%n', 10), '\n' );

    // format
    raises(function(){ mdgw.format('%5n', true); });
    raises(function(){ mdgw.format('%-5n', 10); });
});

test('j - JSON (original)', function() {
    expect(3);

    var obj = {
        id: 10,
        name: 'aaa'
    };
    equal( mdgw.format('%j', obj), '{"id":10,"name":"aaa"}' );

    // format
    equal( mdgw.format('%24j', obj), '  {"id":10,"name":"aaa"}' );
    equal( mdgw.format('%-24j', obj), '{"id":10,"name":"aaa"}  ' );
});
