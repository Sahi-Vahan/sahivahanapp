export interface VehicleModelData {
  name: string;
  variants: string[];
}

export interface VehicleMakeData {
  make: string;
  models: VehicleModelData[];
}

export const CAR_CATALOG: VehicleMakeData[] = [
  {
    make: 'Maruti Suzuki',
    models: [
      { name: 'Swift', variants: ['LXi', 'VXi', 'ZXi', 'ZXi+ (AMT/Manual)'] },
      { name: 'Baleno', variants: ['Sigma', 'Delta', 'Zeta', 'Alpha'] },
      { name: 'Brezza', variants: ['LXi', 'VXi', 'ZXi', 'ZXi+'] },
      { name: 'Dzire', variants: ['LXi', 'VXi', 'ZXi', 'ZXi+'] },
      { name: 'Ertiga', variants: ['LXi', 'VXi', 'ZXi', 'ZXi+ (CNG/Petrol)'] },
      { name: 'Fronx', variants: ['Sigma', 'Delta', 'Delta+', 'Zeta', 'Alpha (Turbo)'] },
      { name: 'Grand Vitara', variants: ['Sigma', 'Delta', 'Zeta', 'Alpha', 'Strong Hybrid'] },
      { name: 'WagonR', variants: ['LXi 1.0', 'VXi 1.0', 'ZXi 1.2', 'ZXi+'] },
      { name: 'Ciaz', variants: ['Sigma', 'Delta', 'Zeta', 'Alpha'] },
      { name: 'XL6', variants: ['Zeta', 'Alpha', 'Alpha+'] },
      { name: 'Alto K10', variants: ['Std', 'LXi', 'VXi', 'VXi+'] },
      { name: 'Celerio', variants: ['LXi', 'VXi', 'ZXi', 'ZXi+'] },
      { name: 'Ignis', variants: ['Sigma', 'Delta', 'Zeta', 'Alpha'] },
      { name: 'Jimny', variants: ['Zeta (4WD)', 'Alpha (4WD)'] },
      { name: 'Invicto', variants: ['Zeta+', 'Alpha+'] },
    ]
  },
  {
    make: 'Hyundai',
    models: [
      { name: 'Creta', variants: ['E', 'EX', 'S', 'S(O)', 'SX', 'SX Tech', 'SX(O)'] },
      { name: 'Venue', variants: ['E', 'S', 'S(O)', 'SX', 'SX(O)', 'N-Line'] },
      { name: 'i20', variants: ['Era', 'Magna', 'Sportz', 'Asta', 'Asta(O)', 'N-Line N8'] },
      { name: 'Grand i10 Nios', variants: ['Era', 'Magna', 'Sportz', 'Asta'] },
      { name: 'Verna', variants: ['EX', 'S', 'SX', 'SX(O) Turbo'] },
      { name: 'Exter', variants: ['EX', 'S', 'SX', 'SX(O)', 'SX(O) Connect'] },
      { name: 'Aura', variants: ['E', 'S', 'SX', 'SX+'] },
      { name: 'Alcazar', variants: ['Prestige', 'Platinum', 'Signature'] },
      { name: 'Tucson', variants: ['Platinum (AWD/FWD)', 'Signature (AWD/FWD)'] },
    ]
  },
  {
    make: 'Tata',
    models: [
      { name: 'Nexon', variants: ['Smart', 'Pure', 'Creative', 'Fearless', 'Fearless+ S'] },
      { name: 'Punch', variants: ['Pure', 'Adventure', 'Accomplished', 'Creative'] },
      { name: 'Altroz', variants: ['XE', 'XM', 'XT', 'XZ', 'XZ+ (DCA/i-Turbo)'] },
      { name: 'Tiago', variants: ['XE', 'XT', 'XZ', 'XZ+'] },
      { name: 'Harrier', variants: ['Smart', 'Pure', 'Adventure', 'Fearless', 'Fearless+'] },
      { name: 'Safari', variants: ['Smart', 'Pure', 'Adventure', 'Accomplished+'] },
      { name: 'Tigor', variants: ['XE', 'XM', 'XZ', 'XZ+'] },
    ]
  },
  {
    make: 'Mahindra',
    models: [
      { name: 'Thar', variants: ['AX Opt (4WD)', 'LX Hard Top (4WD)', 'RWD Diesel/Petrol'] },
      { name: 'Thar Roxx', variants: ['MX1', 'MX3', 'AX3L', 'AX5L', 'AX7L'] },
      { name: 'Scorpio-N', variants: ['Z2', 'Z4', 'Z6', 'Z8', 'Z8L (4XPLOR)'] },
      { name: 'Scorpio Classic', variants: ['S', 'S11'] },
      { name: 'XUV700', variants: ['MX', 'AX3', 'AX5', 'AX7', 'AX7L (AWD)'] },
      { name: 'XUV 3XO', variants: ['MX1', 'MX2', 'MX3', 'AX5', 'AX7', 'AX7L'] },
      { name: 'Bolero', variants: ['B4', 'B6', 'B6 Opt'] },
      { name: 'Bolero Neo', variants: ['N4', 'N8', 'N10', 'N10 Opt'] },
    ]
  },
  {
    make: 'Toyota',
    models: [
      { name: 'Innova Crysta', variants: ['GX', 'VX', 'ZX (Diesel)'] },
      { name: 'Innova Hycross', variants: ['G', 'GX', 'VX Strong Hybrid', 'ZX', 'ZX(O)'] },
      { name: 'Fortuner', variants: ['4x2 Petrol/Diesel', '4x4 Diesel', 'Legender 4x4', 'GR-S'] },
      { name: 'Urban Cruiser Hyryder', variants: ['E', 'S', 'G', 'V (Hybrid/AWD)'] },
      { name: 'Glanza', variants: ['E', 'S', 'G', 'V'] },
      { name: 'Rumion', variants: ['S', 'G', 'V'] },
      { name: 'Hilux', variants: ['Standard 4x4', 'High 4x4 MT/AT'] },
      { name: 'Camry', variants: ['Hybrid 2.5 AT'] },
    ]
  },
  {
    make: 'Honda',
    models: [
      { name: 'City', variants: ['SV', 'V', 'VX', 'ZX (e:HEV Hybrid)'] },
      { name: 'Amaze', variants: ['E', 'S', 'VX (CVT/Manual)'] },
      { name: 'Elevate', variants: ['SV', 'V', 'VX', 'ZX'] },
      { name: 'WR-V', variants: ['SV', 'VX (i-DTEC/i-VTEC)'] },
      { name: 'Jazz', variants: ['V', 'VX', 'ZX'] },
      { name: 'Civic', variants: ['V', 'VX', 'ZX'] },
    ]
  },
  {
    make: 'Kia',
    models: [
      { name: 'Seltos', variants: ['HTE', 'HTK', 'HTK+', 'HTX', 'HTX+', 'GTX+', 'X-Line'] },
      { name: 'Sonet', variants: ['HTE', 'HTK', 'HTK+', 'HTX', 'HTX+', 'GTX+', 'X-Line'] },
      { name: 'Carens', variants: ['Premium', 'Prestige', 'Prestige Plus', 'Luxury', 'Luxury Plus', 'X-Line'] },
      { name: 'Carnival', variants: ['Prestige', 'Limousine', 'Limousine Plus'] },
    ]
  },
  {
    make: 'Volkswagen',
    models: [
      { name: 'Taigun', variants: ['Comfortline 1.0', 'Highline', 'Topline', 'GT 1.5', 'GT Plus DSG'] },
      { name: 'Virtus', variants: ['Comfortline 1.0', 'Highline', 'Topline', 'GT 1.5 TSI', 'GT Plus'] },
      { name: 'Polo', variants: ['Trendline', 'Comfortline', 'Highline Plus', 'GT TSI'] },
      { name: 'Vento', variants: ['Highline Plus', 'Highline TSI'] },
      { name: 'Tiguan', variants: ['Elegance 2.0 TSI 4MOTION'] },
    ]
  },
  {
    make: 'Skoda',
    models: [
      { name: 'Kushaq', variants: ['Active', 'Ambition', 'Style', 'Monte Carlo 1.5 TSI'] },
      { name: 'Slavia', variants: ['Active', 'Ambition', 'Style', 'Monte Carlo 1.5 TSI'] },
      { name: 'Rapid', variants: ['Rider Plus', 'Ambition', 'Style', 'Monte Carlo'] },
      { name: 'Octavia', variants: ['Style', 'L&K (1.8 TSI / 2.0 TSI)'] },
      { name: 'Superb', variants: ['Sportline', 'L&K'] },
      { name: 'Kodiaq', variants: ['Style', 'Sportline', 'L&K 4x4'] },
    ]
  },
  {
    make: 'MG',
    models: [
      { name: 'Hector', variants: ['Style', 'Shine Pro', 'Select Pro', 'Smart Pro', 'Sharp Pro', 'Savvy Pro'] },
      { name: 'Astor', variants: ['Sprint', 'Shine', 'Select', 'Sharp Pro', 'Savvy Pro'] },
      { name: 'Gloster', variants: ['Sharp 4x2', 'Savvy 4x4'] },
    ]
  },
  {
    make: 'Renault',
    models: [
      { name: 'Kwid', variants: ['RXE', 'RXL(O)', 'RXT', 'Climber'] },
      { name: 'Triber', variants: ['RXE', 'RXL', 'RXT', 'RXZ'] },
      { name: 'Kiger', variants: ['RXE', 'RXL', 'RXT(O)', 'RXZ Turbo'] },
      { name: 'Duster', variants: ['RxS', 'RxZ (AWD/Turbo)'] },
    ]
  },
  {
    make: 'Nissan',
    models: [
      { name: 'Magnite', variants: ['Visia', 'Acenta', 'N-Connecta', 'Tekna', 'Tekna+'] },
      { name: 'Kicks', variants: ['XL', 'XV', 'XV Premium Turbo'] },
      { name: 'Micra', variants: ['Active XL', 'XV CVT'] },
      { name: 'Sunny', variants: ['XL', 'XV'] },
    ]
  },
  {
    make: 'Ford',
    models: [
      { name: 'EcoSport', variants: ['Titanium', 'Titanium+', 'Sports', 'S (Diesel/Petrol)'] },
      { name: 'Endeavour', variants: ['Titanium 4x2', 'Titanium+ 4x4', 'Sport 4x4'] },
      { name: 'Figo', variants: ['Titanium', 'Titanium Blu'] },
      { name: 'Aspire', variants: ['Titanium', 'Titanium+'] },
      { name: 'Freestyle', variants: ['Trend', 'Titanium', 'Titanium+'] },
    ]
  },
  {
    make: 'Jeep',
    models: [
      { name: 'Compass', variants: ['Sport', 'Longitude', 'Limited', 'Model S', 'Trailhawk 4x4'] },
      { name: 'Meridian', variants: ['Limited', 'Limited (O)', 'Overland 4x4'] },
      { name: 'Wrangler', variants: ['Unlimited', 'Rubicon 4x4'] },
    ]
  },
  {
    make: 'BMW',
    models: [
      { name: '3 Series', variants: ['320d Luxury Line', '330i M Sport', 'M340i xDrive'] },
      { name: '5 Series', variants: ['520d Luxury Line', '530d M Sport', '530i M Sport'] },
      { name: 'X1', variants: ['sDrive18i xLine', 'sDrive18d M Sport'] },
      { name: 'X3', variants: ['xDrive20d Luxury Edition', 'xDrive30i M Sport'] },
      { name: 'X5', variants: ['xDrive30d xLine', 'xDrive40i M Sport'] },
    ]
  },
  {
    make: 'Mercedes-Benz',
    models: [
      { name: 'C-Class', variants: ['C 200', 'C 220d', 'C 300d AMG Line'] },
      { name: 'E-Class', variants: ['E 200 Exclusive', 'E 220d Exclusive', 'E 350d AMG Line'] },
      { name: 'GLA', variants: ['GLA 200', 'GLA 220d 4MATIC'] },
      { name: 'GLC', variants: ['GLC 200', 'GLC 220d 4MATIC', 'GLC 300 4MATIC'] },
      { name: 'GLE', variants: ['GLE 300d 4MATIC', 'GLE 400d 4MATIC', 'GLE 450 4MATIC'] },
    ]
  },
  {
    make: 'Audi',
    models: [
      { name: 'A4', variants: ['Premium', 'Premium Plus', 'Technology'] },
      { name: 'A6', variants: ['Premium Plus 45 TFSI', 'Technology 45 TFSI'] },
      { name: 'Q3', variants: ['Premium Plus', 'Technology quattro'] },
      { name: 'Q5', variants: ['Premium Plus', 'Technology quattro'] },
      { name: 'Q7', variants: ['Premium Plus', 'Technology quattro'] },
    ]
  },
];

export const BIKE_CATALOG: VehicleMakeData[] = [
  {
    make: 'Royal Enfield',
    models: [
      { name: 'Classic 350', variants: ['Halcyon Series', 'Signals Series', 'Dark Series (Dual ABS)', 'Chrome Series'] },
      { name: 'Hunter 350', variants: ['Retro Factory', 'Dapper Series', 'Rebel Series (Dual ABS)'] },
      { name: 'Bullet 350', variants: ['Military Series', 'Standard Series', 'Black Gold'] },
      { name: 'Meteor 350', variants: ['Fireball', 'Stellar', 'Supernova'] },
      { name: 'Himalayan 450', variants: ['Base', 'Pass', 'Summit (Tubeless)'] },
      { name: 'Interceptor 650', variants: ['Standard', 'Custom', 'Special Chrome', 'Alloy Wheels'] },
      { name: 'Continental GT 650', variants: ['Standard', 'Custom', 'Mr Clean Chrome', 'Alloy Wheels'] },
      { name: 'Super Meteor 650', variants: ['Astral', 'Interstellar', 'Celestial'] },
      { name: 'Guerrilla 450', variants: ['Analogue', 'Dash', 'Flash'] },
    ]
  },
  {
    make: 'Hero MotoCorp',
    models: [
      { name: 'Splendor Plus', variants: ['Self Start / Alloy', 'XTEC (Bluetooth)', 'Black and Accent'] },
      { name: 'HF Deluxe', variants: ['Kick Start', 'Self Start / All Black'] },
      { name: 'Glamour', variants: ['Drum', 'Disc', 'XTEC'] },
      { name: 'Passion Pro', variants: ['Drum', 'Disc', 'XTEC'] },
      { name: 'Xpulse 200 4V', variants: ['Standard', 'Pro Edition (Long Travel Suspension)'] },
      { name: 'Xtreme 160R', variants: ['Single Disc', 'Dual Disc', '4V Pro'] },
      { name: 'Xtreme 125R', variants: ['IBS', 'Single Channel ABS'] },
      { name: 'Karizma XMR', variants: ['Standard 210 Dual Channel ABS'] },
      { name: 'Pleasure Plus', variants: ['LX', 'VX', 'XTEC'] },
      { name: 'Maestro Edge', variants: ['125 Drum', '125 Disc', '125 Connected'] },
    ]
  },
  {
    make: 'Honda',
    models: [
      { name: 'Activa 6G', variants: ['Standard', 'Deluxe', 'H-Smart (Smart Key)'] },
      { name: 'Activa 125', variants: ['Drum', 'Disc', 'H-Smart'] },
      { name: 'Shine 125', variants: ['Drum OBD2', 'Disc OBD2'] },
      { name: 'SP 125', variants: ['Drum', 'Disc', 'Sports Edition'] },
      { name: 'Unicorn', variants: ['Standard (Single Channel ABS)'] },
      { name: 'Dio', variants: ['Standard', 'Deluxe', 'H-Smart'] },
      { name: 'CB350 / H\'ness CB350', variants: ['DLX', 'DLX Pro', 'DLX Pro Chrome', 'Legacy Edition'] },
      { name: 'CB350RS', variants: ['Monotone', 'Dual Tone', 'New Hue Edition'] },
      { name: 'Hornet 2.0', variants: ['Standard', 'Repsol Edition'] },
      { name: 'CB300R', variants: ['Standard Dual Channel ABS'] },
      { name: 'CB200X', variants: ['Standard'] },
    ]
  },
  {
    make: 'TVS',
    models: [
      { name: 'Apache RTR 160 4V', variants: ['Special Edition', 'Dual Channel ABS', 'Single Disc'] },
      { name: 'Apache RTR 200 4V', variants: ['Single Channel ABS', 'Dual Channel ABS with Ride Modes'] },
      { name: 'Apache RTR 160 2V', variants: ['Front Disc', 'Rear Disc'] },
      { name: 'Apache RR 310', variants: ['Standard with BTO Race Kit'] },
      { name: 'Apache RTR 310', variants: ['Arsenal Black', 'Fury Yellow', 'BTO Kit'] },
      { name: 'Raider 125', variants: ['Drum', 'Single Disc', 'SmartXonnect TFT'] },
      { name: 'Jupiter 110', variants: ['Sheet Metal', 'Standard Drum', 'SmartXonnect Disc'] },
      { name: 'Jupiter 125', variants: ['Drum', 'Alloy Drum', 'SmartXonnect Disc'] },
      { name: 'Ntorq 125', variants: ['Standard Disc', 'Race Edition', 'Super Squad Edition', 'XT'] },
      { name: 'Ronin', variants: ['SS Single Tone', 'DS Dual Tone', 'TD Triple Tone (Dual ABS)'] },
    ]
  },
  {
    make: 'Bajaj',
    models: [
      { name: 'Pulsar 150', variants: ['Single Disc', 'Twin Disc'] },
      { name: 'Pulsar NS200', variants: ['Standard Dual Channel ABS (USD Forks)'] },
      { name: 'Pulsar N160', variants: ['Single Channel ABS', 'Dual Channel ABS (USD Forks)'] },
      { name: 'Pulsar RS200', variants: ['Standard Dual ABS'] },
      { name: 'Pulsar N250', variants: ['Dual Channel ABS with Traction Control'] },
      { name: 'Pulsar NS400Z', variants: ['Standard 400cc Dual ABS'] },
      { name: 'Pulsar 125', variants: ['Neon Single Seat', 'Carbon Fibre Split Seat'] },
      { name: 'Dominar 400', variants: ['Touring Edition with Tall Visor'] },
      { name: 'Dominar 250', variants: ['Standard Dual Channel ABS'] },
      { name: 'Platina 100 / 110', variants: ['100 KS', '110 Drum', '110 ABS'] },
      { name: 'Avenger 220 Cruise', variants: ['Standard with Windshield'] },
    ]
  },
  {
    make: 'Yamaha',
    models: [
      { name: 'MT-15 V2', variants: ['Standard (USD)', 'Deluxe (TCS & Bluetooth)', 'Cyber Green / Moto GP'] },
      { name: 'R15 V4', variants: ['Metallic Red', 'Dark Knight', 'Racing Blue (Quickshifter)', 'M Edition'] },
      { name: 'FZ-S FI V4', variants: ['Standard Deluxe'] },
      { name: 'FZ-X', variants: ['Standard Bluetooth (TCS)'] },
      { name: 'RayZR 125 Fi Hybrid', variants: ['Drum', 'Disc', 'Street Rally Edition'] },
      { name: 'Aerox 155', variants: ['Standard (TCS)', 'MotoGP Edition'] },
      { name: 'Fascino 125 Fi Hybrid', variants: ['Drum', 'Disc SPL'] },
    ]
  },
  {
    make: 'KTM',
    models: [
      { name: 'Duke 200', variants: ['Standard Gen 3 (Dual ABS)'] },
      { name: 'Duke 390', variants: ['Gen 3 with Launch Control & Quickshifter'] },
      { name: 'Duke 250', variants: ['Gen 3 Standard'] },
      { name: 'RC 200', variants: ['GP Edition', 'Standard Dual ABS'] },
      { name: 'RC 390', variants: ['Standard with Adjustable Suspension', 'GP Edition'] },
      { name: '390 Adventure', variants: ['Standard (Spoke Wheels)', 'Adventure X (Alloys)'] },
      { name: '250 Adventure', variants: ['Standard Dual ABS'] },
    ]
  },
  {
    make: 'Suzuki',
    models: [
      { name: 'Access 125', variants: ['Standard Drum', 'Standard Disc', 'Ride Connect Bluetooth', 'Special Edition'] },
      { name: 'Burgman Street', variants: ['Standard', 'Ride Connect', 'EX Edition'] },
      { name: 'Avenis 125', variants: ['Standard', 'Race Edition'] },
      { name: 'Gixxer SF 150', variants: ['Standard Single ABS', 'Ride Connect'] },
      { name: 'Gixxer 250', variants: ['Standard Dual ABS'] },
      { name: 'Gixxer SF 250', variants: ['Standard Dual ABS', 'MotoGP Edition'] },
      { name: 'V-Strom SX', variants: ['Standard 250cc Dual ABS'] },
    ]
  },
  {
    make: 'Jawa / Yezdi',
    models: [
      { name: 'Classic 350', variants: ['Single Channel ABS', 'Dual Channel ABS'] },
      { name: '42', variants: ['Standard', '42 Version 2.1 (Alloys)'] },
      { name: '42 Bobber', variants: ['Moonstone White', 'Jasper Red', 'Black Mirror (Alloys)'] },
      { name: 'Perak', variants: ['Single Seat Factory Custom'] },
      { name: 'Roadster', variants: ['Dark', 'Chrome'] },
      { name: 'Scrambler', variants: ['Single Tone', 'Dual Tone'] },
      { name: 'Adventure', variants: ['Standard Dual ABS'] },
    ]
  },
  {
    make: 'Kawasaki',
    models: [
      { name: 'Ninja 300', variants: ['Standard Dual ABS'] },
      { name: 'Ninja 400', variants: ['Lime Green', 'Ebony'] },
      { name: 'Ninja 500', variants: ['Standard'] },
      { name: 'Ninja 650', variants: ['Standard KTRC'] },
      { name: 'Z650', variants: ['Standard KTRC'] },
      { name: 'Z900', variants: ['Standard'] },
      { name: 'Vulcan S', variants: ['Metallic Matte Carbon'] },
    ]
  },
  {
    make: 'Triumph',
    models: [
      { name: 'Speed 400', variants: ['Standard Dual ABS (Ride-by-wire)'] },
      { name: 'Scrambler 400 X', variants: ['Standard Dual ABS / Off-road Mode'] },
      { name: 'Speed T4', variants: ['Standard'] },
      { name: 'Trident 660', variants: ['Standard'] },
      { name: 'Street Triple 765', variants: ['R', 'RS'] },
      { name: 'Tiger 900', variants: ['GT', 'Rally Pro'] },
    ]
  },
  {
    make: 'Harley-Davidson',
    models: [
      { name: 'X440', variants: ['Denim (Spoke Wheels)', 'Vivid (Alloys)', 'S (Machined Alloys & eSIM)'] },
      { name: 'Iron 883', variants: ['Standard Dark Custom'] },
      { name: 'Street 750', variants: ['Standard'] },
      { name: 'Fat Boy', variants: ['Milwaukee-Eight 114'] },
    ]
  },
  {
    make: 'BMW Motorrad',
    models: [
      { name: 'G 310 R', variants: ['Style Passion', 'Sport Style'] },
      { name: 'G 310 GS', variants: ['Rallye Style', 'Triple Black'] },
      { name: 'G 310 RR', variants: ['Standard', 'Style Sport'] },
      { name: 'F 900 XR', variants: ['Standard', 'Triple Black'] },
      { name: 'R 1250 GS', variants: ['Pro', 'Triple Black 40 Years'] },
    ]
  },
];

