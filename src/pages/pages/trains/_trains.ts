import bart from  "./_bart.svg";
import bombardierTorontoBilevelCoach from  "./_bombardier_toronto_bilevel_coach.svg";
import bombardierTorontoT1 from  "./_bombardier_toronto_t1.svg";
import bombardierTorontoTR from  "./_bombardier_toronto_tr.svg";
import mbtaBlueLine from  "./_mbta_blue_line.svg";
import mbtaGreenLine from  "./_mbta_green_line.svg";
import mbtaOrangeLine from  "./_mbta_orange_line.svg";
import mbtaRedLine from  "./_mbta_red_line.svg";
import montrealRem from  "./_montreal_rem.svg";
import nsVirm from  "./_ns_virm.svg";
import nycR211 from  "./_nyc_r211.svg";
import peterWittRochesterCar60 from  "./_peter_witt_rochester_car_60.svg";
import peterWittRochesterIntercity from  "./_peter_witt_rochester_forgor.svg";

type train = {
  location: String;
  alt: String;
  image: ImageMetadata;
};

export default [
  {
    location: "Toronto",
    name: "Bombardier BiLevel Cab",
    alt: "Bombardier BiLevel cab car in Toronto paint scheme",
    image: bombardierTorontoBilevelCoach,
  },
  {
    location: "Toronto",
    name: "Bombardier T1",
    alt: "Bombardier T1",
    image: bombardierTorontoT1,
  },
  {
    location: "Toronto",
    name: "Toronto Rocket",
    alt: "Bombardier Toronto Rocket",
    image: bombardierTorontoTR,
  },
  {
    location: "Boston",
    name: "UTDC Series 2 (Red Line)",
    alt: "UTDC Series 2 (Red Line)",
    image: mbtaRedLine,
  },
  {
    location: "Boston",
    name: "Hawker-Siddley (Orange Line)",
    alt: "Hawker-Siddley Orange Line Train",
    image: mbtaOrangeLine,
  },
  {
    location: "Boston",
    name: "Kinki Sharyo MBTA Type 7 (Green Line)",
    alt: "Kinki Sharyo MBTA Type 7 (Green Line)",
    image: mbtaGreenLine,
  },
  {
    location: "Boston",
    name: "Siemens 700 Series (Blue Line)",
    alt: "Siemens 700 Series (Blue Line)",
    image: mbtaBlueLine,
  },
  {
    location: "SF Bay Area",
    name: "Rohr Industries BART A Car",
    alt: "Rohr Industries BART A Car",
    image: bart,
  },
  {
    location: "New York City",
    name: "Kawasaki Railcar Manufacturing (NYC R211)",
    alt: "Kawasaki Railcar Manufacturing (NYC R211)",
    image: nycR211,
  },
  {
    location: "Netherlands",
    name: "Talbot Verlengd InterRegio Materieel (NS VIRM)",
    alt: "Talbot Verlengd InterRegio Materieel (NS VIRM)",
    image: nsVirm,
  },
  {
    location: "Montreal",
    name: "Alstom Metropolis Saint-Laurent (REM)",
    alt: "Alstom Metropolis Saint-Laurent in the Montreal REM paint scheme",
    image: montrealRem,
  },
  {
    location: "New York State",
    name: "Peter Witt Streetcar (New York Intercity)",
    alt: "Peter Witt Streetcar (New York Intercity)",
    image: peterWittRochesterIntercity,
  },
  {
    location: "Rochester",
    name: "Peter Witt Streetcar (Rochester Subway Car)",
    alt: "Peter Witt Streetcar (Rochester Subway Car)",
    image: peterWittRochesterCar60,
  },
];
