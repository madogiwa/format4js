import org.junit.Test;
import org.junit.runner.JUnitCore;

import java.util.Date;
import java.util.Locale;

import static org.hamcrest.core.IsInstanceOf.instanceOf;
import static org.junit.Assert.*;

/**
 * @author Hidenori Sugiyama
 * 
 */
public class FormatTest {

	public static void main(String[] args) {
		JUnitCore.main(FormatTest.class.getName());
	}

	@Test
	public void testNoConversion() {
		assertEquals(String.format("01234567890"), "01234567890");
		assertEquals(String.format("10", 20), "10");
	}

	@Test
	public void testArgument() {
		assertEquals( String.format("%1$d %d %<d %1$d %d %<d", 1, 2, 3, 4), "1 1 1 1 2 2" );
		assertEquals( String.format("%d %% %d", 1, 2, 3), "1 % 2" );

		try {
			String.format("%<d", 1);
			fail("Exception is Expected");
		} catch (Exception e) {
			assertThat(e, instanceOf(Exception.class));
		}
	}

	@Test
	public void testBoolean() {
		assertEquals(String.format("%b", true), "true");

		boolean b = false;
		assertEquals(String.format("%b", b), "false");
		assertEquals(String.format("%b", null), "false");
		assertEquals(String.format("%b", 300), "true");
		assertEquals(String.format("%b", "string"), "true");

		// format
		assertEquals(String.format("%5b", true), " true");
		assertEquals(String.format("%-5b", true), "true ");

		try {
			String.format("%#b", false);
			fail("Exception is Expected");
		} catch (Exception e) {
			assertThat(e, instanceOf(Exception.class));
		}
	}

	@Test
	public void testString() {
		assertEquals(String.format("%s", "hello"), "hello");
		assertEquals(String.format("%S", "hello"), "HELLO");

		// format
		assertEquals(String.format("%7s", "hello"), "  hello");
		assertEquals(String.format("%-7s", "hello"), "hello  ");

		try {
			assertEquals(String.format("%#7s", "hello"), "  hello");
			fail("Exception is Expected");
		} catch (Exception e) {
			assertThat(e, instanceOf(Exception.class));
		}

		try {
			String.format("%-+");
			fail("Exception is Expected");
		} catch (Exception e) {
			assertThat(e, instanceOf(Exception.class));
		}
	}

	@Test
	public void testCharacter() {
		assertEquals(String.format("%c", 'h'), "h");
		assertEquals(String.format("%C", 'h'), "H");

		// illegal format conversion
		try {
			String.format("%C", "hello");
			fail("Exception is Expected");
		} catch (Exception e) {
			assertThat(e, instanceOf(Exception.class));
		}

		// format
		assertEquals(String.format("%5c", 'x'), "    x");
		assertEquals(String.format("%-5c", 'x'), "x    ");

		try {
			String.format("%#5c", 'x');
			fail("Exception is Expected");
		} catch (Exception e){
			assertThat(e, instanceOf(Exception.class));
		}

		// exception
		try {
			String.format("%c", "hello");
			fail("Exception is Expected");
		} catch (Exception e) {
			assertThat(e, instanceOf(Exception.class));
		}
	}

	@Test
	public void testDecimalInteger() {
		assertEquals(String.format("%d", 10), "10");
		assertEquals(String.format("%03d", 10), "010");

		// illegal format conversion
		try {
			String.format("%d", 10.5);
			fail("Exception is Expected");
		} catch (Exception e) {
			assertThat(e, instanceOf(Exception.class));
		}

		// format
		assertEquals(String.format("%5d", 10), "   10");
		assertEquals(String.format("%-5d", 10), "10   ");

		try {
			String.format("%#5d", 10);
			fail("Exception is Expected");
		} catch (Exception e) {
			assertThat(e, instanceOf(Exception.class));
		}

		// signPlus
		assertEquals(String.format("%+5d", 10), "  +10");
		assertEquals(String.format("%+5d", -10), "  -10");

		// singSpace
		assertEquals(String.format("% -5d", 10), " 10  ");
		assertEquals(String.format("% -5d", -10), "-10  ");

		// zeroPadding
		assertEquals(String.format("%05d", 10), "00010");

		// groupSeparator
		assertEquals(String.format("%,5d", 10), "   10");
		assertEquals(String.format("%,6d", 1000), " 1,000");

		// surroundNegative
		assertEquals(String.format("%(5d", 10), "   10");
		assertEquals(String.format("%(6d", -10), "  (10)");

		// combination
		try {
			String.format("%+ d", 10);
			fail("Exception is Expected");
		} catch (Exception e) {
			assertThat(e, instanceOf(Exception.class));
		}

	}

	@Test
	public void testOctalInteger() {
		assertEquals(String.format("%o", 10), "12");

		// format
		assertEquals(String.format("%5o", 10), "   12");
		assertEquals(String.format("%-5o", 10), "12   ");
		assertEquals(String.format("%#5o", 10), "  012");
		assertEquals(String.format("%#5o", 0), "   00");

		// zeroPadding
		assertEquals(String.format("%05o", 10), "00012");

		// signPlus
		try {
			String.format("%+5o", 10);
			fail("Exception is Expected");
		} catch (Exception e) {
			assertThat(e, instanceOf(Exception.class));
		}

		// singSpace
		try {
			String.format("% -5o", 10);
			fail("Exception is Expected");
		} catch (Exception e) {
			assertThat(e, instanceOf(Exception.class));
		}

		// groupSeparator
		try {
			String.format("%,5o", 10);
			fail("Exception is Expected");
		} catch (Exception e) {
			assertThat(e, instanceOf(Exception.class));
		}

		// surroundNegative
		try {
			String.format("%(5o", 10);
			fail("Exception is Expected");
		} catch (Exception e) {
			assertThat(e, instanceOf(Exception.class));
		}

	}

	@Test
	public void testHexadecimalInteger() {
		assertEquals(String.format("%x", 30), "1e");
		assertEquals(String.format("%X", 30), "1E");

		// format
		assertEquals(String.format("%5x", 30), "   1e");
		assertEquals(String.format("%-5x", 30), "1e   ");
		assertEquals(String.format("%#5x", 30), " 0x1e");
		assertEquals(String.format("%#5x", 0), "  0x0");

		// signPlus
		try {
			String.format("%+5x", 10);
			fail("Exception is Expected");
		} catch (Exception e) {
			assertThat(e, instanceOf(Exception.class));
		}

		// singSpace
		try {
			String.format("% -5x", 10);
			fail("Exception is Expected");
		} catch (Exception e) {
			assertThat(e, instanceOf(Exception.class));
		}

		// zeroPadding
		assertEquals(String.format("%05x", 10), "0000a");

		// groupSeparator
		try {
			String.format("%,5x", 10);
			fail("Exception is Expected");
		} catch (Exception e) {
			assertThat(e, instanceOf(Exception.class));
		}

		// surroundNegative
		try {
			String.format("%(5x", 10);
			fail("Exception is Expected");
		} catch (Exception e) {
			assertThat(e, instanceOf(Exception.class));
		}

	}

	@Test
	public void testExponential() {
		assertEquals(String.format("%e", 1000.0), "1.000000e+03");
		assertEquals(String.format("%E", 1000.0), "1.000000E+03");

		// format
		assertEquals(String.format("%15e", 1000.0), "   1.000000e+03");
		assertEquals(String.format("%-15e", 1000.0), "1.000000e+03   ");
		assertEquals(String.format("%#16e", 1000.0), "    1.000000e+03");
		assertEquals(String.format("%#16e", 1000.5), "    1.000500e+03");

	    // signPlus
	    assertEquals( String.format("%+15e", 1000.0), "  +1.000000e+03" );

	    // singSpace
	    assertEquals( String.format("% -15e", 1000.0), " 1.000000e+03  " );

	    // zeroPadding
	    assertEquals( String.format("%015e", 1000.0), "0001.000000e+03" );

	    // groupSeparator
	    try {
	    	String.format("%,15e", 1000.0);
			fail("Exception is Expected");
	    } catch (Exception e) {
			assertThat(e, instanceOf(Exception.class));
	    }

	    // surroundNegative
	    assertEquals( String.format("%(15e", -1000.0), " (1.000000e+03)" );
	}

	@Test
	public void testFloat() {
		assertEquals(String.format("%f", 10.5), "10.500000");
		assertEquals(String.format("%f", -10.5), "-10.500000");
		assertEquals(String.format("%03.3f", 10.25678), "10.257");

        // float rounding issue
		assertEquals(String.format("%03.2f", 10.025678), "10.03");
		assertEquals(String.format("%03.2f", 10.085678), "10.09");
		assertEquals(String.format("%03.2f", 10.0000085678), "10.00");

		// format
		assertEquals(String.format("%10f", 10.5), " 10.500000");
		assertEquals(String.format("%-10f", 10.5), "10.500000 ");
		assertEquals(String.format("%#10f", 10.5), " 10.500000");
		assertEquals(String.format("%#10f", 10.0), " 10.000000");

	    // signPlus
	    assertEquals( String.format("%+10f", 10.5), "+10.500000" );

	    // singSpace
	    assertEquals( String.format("% -12f", 10.5), " 10.500000  " );

	    // zeroPadding
	    assertEquals( String.format("%012f", 10.5), "00010.500000" );

	    // groupSeparator
	    assertEquals( String.format("%,14f", 1000.5), "  1,000.500000" );

	    // surroundNegative
	    assertEquals( String.format("%(12f", -10.5), " (10.500000)" );
	}

	@Test
	public void testComputerizedScientificNotation() {
		assertEquals(String.format("%g", 3.14159), "3.14159");
		assertEquals(String.format("%.9G", 3.14159), "3.14159000");

		assertEquals(String.format("%g", 100000.1), "100000");
		assertEquals(String.format("%g", 1000000000.1), "1.00000e+09");
		assertEquals(String.format("%.10g", 1000000000.1), "1000000000");

		// format
		assertEquals(String.format("%8g", 3.14159), " 3.14159");
		assertEquals(String.format("%-8g", 3.14159), "3.14159 ");

		try {
			String.format("%#8g", 3.14159);
			fail("Exception is Expected");
		} catch (Exception e) {
			assertThat(e, instanceOf(Exception.class));
		}

	    // signPlus
	    assertEquals( String.format("%+10g", 3.14159), "  +3.14159" );

	    // singSpace
	    assertEquals( String.format("% -10g", 3.14159), " 3.14159  " );

	    // zeroPadding
	    assertEquals( String.format("%010g", 3.14159), "0003.14159" );

	    // groupSeparator
	    assertEquals( String.format("%,10g", 3000.14159), "  3,000.14" );

	    // surroundNegative
	    assertEquals( String.format("%(10g", -3.14159), " (3.14159)" );
	}

	@Test
	public void testHexadecimalFloat() {
		assertEquals(String.format("%a", 3.14159), "0x1.921f9f01b866ep1");
		assertEquals(String.format("%A", 3.14159), "0X1.921F9F01B866EP1");

		// format
		assertEquals(String.format("%20a", 3.14159), " 0x1.921f9f01b866ep1");
		assertEquals(String.format("%-20a", 3.14159), "0x1.921f9f01b866ep1 ");
		assertEquals(String.format("%#20a", 3.14159), " 0x1.921f9f01b866ep1");
		assertEquals(String.format("%#10a", 3.), "   0x1.8p1");

	    // signPlus
	    assertEquals( String.format("%+22a", 3.14159), "  +0x1.921f9f01b866ep1" );

	    // singSpace
	    assertEquals( String.format("% -22a", 3.14159), " 0x1.921f9f01b866ep1  " );

	    // zeroPadding
	    assertEquals( String.format("%022a", 3.14159), "0x0001.921f9f01b866ep1" );

	    // groupSeparator
	    try {
	    	String.format("%,22a", 3.14159);
			fail("Exception is Expected");
	    } catch (Exception e) {
			assertThat(e, instanceOf(Exception.class));
	    }

	    // surroundNegative
	    try {
		    String.format("%(22a", -3.14159);
			fail("Exception is Expected");
	    } catch (Exception e) {
			assertThat(e, instanceOf(Exception.class));
	    }
	}

	@Test
	public void testDateAndTimeFoundamental() {
		Locale.setDefault(Locale.US);

		Date date = new Date(81, 8, 2, 4, 5, 6);
		date.setTime(date.getTime() + 98);
		Date date2 = new Date(82, 11, 5, 14, 15, 6);

		assertEquals(String.format("%tH", date), "04");
		assertEquals(String.format("%tI", date), "04");
		assertEquals(String.format("%tI", date2), "02");
		assertEquals(String.format("%tk", date), "4");
		assertEquals(String.format("%tl", date), "4");
		assertEquals(String.format("%tl", date2), "2");
		assertEquals(String.format("%tM", date), "05");
		assertEquals(String.format("%tS", date), "06");

		assertEquals(String.format("%tL", date), "098");

//		try {
//			String.format("%tN", date);
//			fail("");
//		} catch (Exception e) {
//		}

		assertEquals(String.format("%tp", date), "am");
		assertEquals(String.format("%Tp", date2), "PM");

		assertEquals(String.format("%tz", date), "+0900");
//		try {
//			String.format("%tZ", date);
//			fail("");
//		} catch (Exception e) {
//		}

		assertEquals(String.format("%ts", date), "368219106");
		assertEquals(String.format("%tQ", date), "368219106098");

		// format
		assertEquals(String.format("%5tH", date), "   04");
		assertEquals(String.format("%-5tH", date), "04   ");
	}

	@Test
	public void testDateAndTimeFormatting() {
		Date date = new Date(81, 8, 2, 4, 5, 6);

		assertEquals(String.format("%tB", date), "September");
		assertEquals(String.format("%tb", date), "Sep");
		assertEquals(String.format("%th", date), "Sep");

		assertEquals(String.format("%tA", date), "Wednesday");
		assertEquals(String.format("%ta", date), "Wed");

		assertEquals(String.format("%tC", date), "19");
		assertEquals(String.format("%tY", date), "1981");
		assertEquals(String.format("%ty", date), "81");
		assertEquals(String.format("%tj", date), "245");
		assertEquals(String.format("%tm", date), "09");

		assertEquals(String.format("%td", date), "02");
		assertEquals(String.format("%te", date), "2");

		// format
		assertEquals(String.format("%5tb", date), "  Sep");
		assertEquals(String.format("%-5tb", date), "Sep  ");
	}

	@Test
	public void testDateAndTimeComposition() {
		Date date = new Date(81, 8, 2, 4, 5, 6);
		assertEquals(String.format("%tR", date), "04:05");
		assertEquals(String.format("%tT", date), "04:05:06");
		assertEquals(String.format("%tr", date), "04:05:06 AM");
		assertEquals(String.format("%Tr", date), "04:05:06 AM");
		assertEquals(String.format("%tD", date), "09/02/81");
		assertEquals(String.format("%tF", date), "1981-09-02");

//		try {
//			String.format("%tc", date);
//			fail("");
//		} catch (Exception e) {
//		}

		// format
		assertEquals(String.format("%7tR", date), "  04:05");
		assertEquals(String.format("%-7tR", date), "04:05  ");
	}

	@Test
	public void testLiteral() {
		assertEquals(String.format("%%"), "%");
		assertEquals(String.format("%%", 10), "%");

		// format
		assertEquals(String.format("%5%", true), "%");
		assertEquals(String.format("%-5%", 10), "%");
	}

	@Test
	public void testLineSeparator() {
		assertEquals(String.format("%n"), "\n");
		assertEquals(String.format("%n", 10), "\n");

		// format
		try {
			assertEquals(String.format("%5n", true), "    \n");
			fail("Exception is Expected");
		} catch (Exception e) {
			assertThat(e, instanceOf(Exception.class));
		}

		try {
			assertEquals(String.format("%-5n", 10), "\n    ");
			fail("Exception is Expected");
		} catch (Exception e) {
			assertThat(e, instanceOf(Exception.class));
		}
	}
}
