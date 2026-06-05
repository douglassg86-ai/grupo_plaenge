import rawOverrides from '@/data/availability-overrides.json'

export interface ShiftUnit {
  id: number
  code: string
  floor: number
  prumada: string
  area: number
  status: 'available' | 'sold' | 'negotiation'
}

type StatusType = 'available' | 'sold' | 'negotiation'
const _ov = rawOverrides as Record<string, Record<string, StatusType>>
function applyOv(units: ShiftUnit[], key: string): ShiftUnit[] {
  const m = _ov[key] || {}
  return units.map(u => ({ ...u, status: m[String(u.id)] ?? u.status }))
}

const soldCodes = new Set([
  '202','204','205','213','214','215','305','306','307','308',
  '309','310','311','312','405','406','407','408','409','410',
  '411','412','413','414','505','506','507','508','509','510',
  '511','512','513','514','515','605','606','607','608','609',
  '610','611','612','613','614','615','705','706','707','708',
  '709','710','711','712','713','714','715','802','805','806',
  '807','808','809','810','811','812','813','814','815','902',
  '903','904','905','906','907','908','909','910','911','912',
  '913','914','915','1002','1003','1004','1005','1006','1007','1008',
  '1009','1010','1011','1012','1013','1101','1102','1103','1104','1105',
  '1106','1107','1108','1109','1110','1111','1112','1201','1202','1203',
  '1204','1205','1206','1207','1208','1209','1210','1211','1301','1302',
  '1303','1304','1305','1306','1307','1308','1309','1310','1401','1402',
  '1403','1404','1405','1406','1407','1408','1409','1501','1502','1503',
  '1504','1505','1506','1507','1508','1509',
])
const negotiationCodes = new Set(['314', '315', '415', '1001'])

const rawList: { code: string; area: number }[] = [
  { code: '1501', area: 24.38 }, { code: '1502', area: 23.66 }, { code: '1503', area: 23.66 }, { code: '1504', area: 24.38 }, { code: '1505', area: 24.28 }, { code: '1506', area: 23.75 }, { code: '1507', area: 23.75 }, { code: '1508', area: 23.75 }, { code: '1509', area: 24.5 },
  { code: '1401', area: 24.38 }, { code: '1402', area: 23.66 }, { code: '1403', area: 23.66 }, { code: '1404', area: 24.38 }, { code: '1405', area: 24.28 }, { code: '1406', area: 23.75 }, { code: '1407', area: 23.75 }, { code: '1408', area: 108 }, { code: '1409', area: 34.18 },
  { code: '1301', area: 24.38 }, { code: '1302', area: 23.66 }, { code: '1303', area: 23.66 }, { code: '1304', area: 24.38 }, { code: '1305', area: 24.28 }, { code: '1306', area: 23.75 }, { code: '1307', area: 23.75 }, { code: '1308', area: 23.75 }, { code: '1309', area: 23.75 }, { code: '1310', area: 91.63 },
  { code: '1201', area: 24.38 }, { code: '1202', area: 23.66 }, { code: '1203', area: 23.66 }, { code: '1204', area: 24.38 }, { code: '1205', area: 24.28 }, { code: '1206', area: 23.75 }, { code: '1207', area: 23.75 }, { code: '1208', area: 23.75 }, { code: '1209', area: 74.7 }, { code: '1210', area: 33.7 }, { code: '1211', area: 24.28 },
  { code: '1101', area: 24.38 }, { code: '1102', area: 23.66 }, { code: '1103', area: 23.66 }, { code: '1104', area: 24.38 }, { code: '1105', area: 24.28 }, { code: '1106', area: 23.75 }, { code: '1107', area: 23.75 }, { code: '1108', area: 23.75 }, { code: '1109', area: 23.75 }, { code: '1110', area: 25.48 }, { code: '1111', area: 30.13 }, { code: '1112', area: 81.22 },
  { code: '1001', area: 24.38 }, { code: '1002', area: 23.66 }, { code: '1003', area: 23.66 }, { code: '1004', area: 24.38 }, { code: '1005', area: 24.28 }, { code: '1006', area: 23.75 }, { code: '1007', area: 23.75 }, { code: '1008', area: 23.75 }, { code: '1009', area: 23.75 }, { code: '1010', area: 76.37 }, { code: '1011', area: 33.53 }, { code: '1012', area: 23.75 }, { code: '1013', area: 24.28 },
  { code: '901', area: 24.38 }, { code: '902', area: 23.66 }, { code: '903', area: 23.66 }, { code: '904', area: 24.38 }, { code: '905', area: 24.28 }, { code: '906', area: 23.75 }, { code: '907', area: 23.75 }, { code: '908', area: 23.75 }, { code: '909', area: 23.75 }, { code: '910', area: 25.48 }, { code: '911', area: 25.48 }, { code: '912', area: 25.78 }, { code: '913', area: 24.28 }, { code: '914', area: 23.75 }, { code: '915', area: 24.28 },
  { code: '801', area: 24.38 }, { code: '802', area: 23.66 }, { code: '803', area: 23.66 }, { code: '804', area: 24.38 }, { code: '805', area: 24.28 }, { code: '806', area: 23.75 }, { code: '807', area: 23.75 }, { code: '808', area: 23.75 }, { code: '809', area: 23.75 }, { code: '810', area: 25.48 }, { code: '811', area: 25.48 }, { code: '812', area: 25.78 }, { code: '813', area: 24.28 }, { code: '814', area: 23.75 }, { code: '815', area: 24.28 },
  { code: '701', area: 24.38 }, { code: '702', area: 23.66 }, { code: '703', area: 23.66 }, { code: '704', area: 24.38 }, { code: '705', area: 24.28 }, { code: '706', area: 23.75 }, { code: '707', area: 23.75 }, { code: '708', area: 23.75 }, { code: '709', area: 23.75 }, { code: '710', area: 25.48 }, { code: '711', area: 25.48 }, { code: '712', area: 25.78 }, { code: '713', area: 24.28 }, { code: '714', area: 23.75 }, { code: '715', area: 24.28 },
  { code: '601', area: 24.38 }, { code: '602', area: 23.66 }, { code: '603', area: 23.66 }, { code: '604', area: 24.38 }, { code: '605', area: 24.28 }, { code: '606', area: 23.75 }, { code: '607', area: 23.75 }, { code: '608', area: 23.75 }, { code: '609', area: 23.75 }, { code: '610', area: 25.48 }, { code: '611', area: 25.48 }, { code: '612', area: 25.78 }, { code: '613', area: 24.28 }, { code: '614', area: 23.75 }, { code: '615', area: 24.28 },
  { code: '501', area: 24.38 }, { code: '502', area: 23.66 }, { code: '503', area: 23.66 }, { code: '504', area: 24.38 }, { code: '505', area: 24.28 }, { code: '506', area: 23.75 }, { code: '507', area: 23.75 }, { code: '508', area: 23.75 }, { code: '509', area: 23.75 }, { code: '510', area: 25.48 }, { code: '511', area: 25.48 }, { code: '512', area: 25.78 }, { code: '513', area: 24.28 }, { code: '514', area: 23.75 }, { code: '515', area: 24.28 },
  { code: '401', area: 24.38 }, { code: '402', area: 23.66 }, { code: '403', area: 23.66 }, { code: '404', area: 24.38 }, { code: '405', area: 24.28 }, { code: '406', area: 23.75 }, { code: '407', area: 23.75 }, { code: '408', area: 23.75 }, { code: '409', area: 23.75 }, { code: '410', area: 25.48 }, { code: '411', area: 25.48 }, { code: '412', area: 25.78 }, { code: '413', area: 24.28 }, { code: '414', area: 23.75 }, { code: '415', area: 24.28 },
  { code: '301', area: 24.38 }, { code: '302', area: 23.66 }, { code: '303', area: 23.66 }, { code: '304', area: 24.38 }, { code: '305', area: 24.28 }, { code: '306', area: 23.75 }, { code: '307', area: 23.75 }, { code: '308', area: 23.75 }, { code: '309', area: 23.75 }, { code: '310', area: 25.48 }, { code: '311', area: 25.48 }, { code: '312', area: 25.78 }, { code: '313', area: 24.28 }, { code: '314', area: 23.75 }, { code: '315', area: 24.28 },
  { code: '201', area: 24.38 }, { code: '202', area: 23.66 }, { code: '203', area: 23.66 }, { code: '204', area: 24.38 }, { code: '205', area: 25.78 }, { code: '206', area: 25.42 }, { code: '207', area: 25.42 }, { code: '208', area: 25.48 }, { code: '209', area: 25.48 }, { code: '210', area: 25.48 }, { code: '211', area: 25.48 }, { code: '212', area: 25.78 }, { code: '213', area: 47.52 }, { code: '214', area: 46.48 }, { code: '215', area: 47.34 },
]

const _rawUnits: ShiftUnit[] = rawList.map((u, idx) => ({
  id: idx + 1,
  code: u.code,
  floor: parseInt(u.code.slice(0, -2)),
  prumada: u.code.slice(-2),
  area: u.area,
  status: soldCodes.has(u.code) ? 'sold' : negotiationCodes.has(u.code) ? 'negotiation' : 'available',
}))

export const shiftUnits = applyOv(_rawUnits, 'shift')
