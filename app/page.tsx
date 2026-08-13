export interface Product {
  id: string;
  title: string;
  price: number;
  category: string;
  condition: string;
  image: string;
  seller: string;
  location: string;
  timeAgo: string;
}

export const MOCK_PRODUCTS: Product[] = [
  {
    id: "1",
    title: "หนังสือเรียน Calculus 1 สภาพ 95% มีไฮไลท์เล็กน้อย",
    price: 150,
    category: "หนังสือ",
    condition: "มือสอง",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&q=80",
    seller: "พี่มอปี 3",
    location: "ใต้ตึกวิศวะ",
    timeAgo: "10 นาทีที่แล้ว",
  },
  {
    id: "2",
    title: "พัดลมตั้งโต๊ะ Hatari 8 นิ้ว สำหรับเด็กหอ",
    price: 220,
    category: "เครื่องใช้ไฟฟ้า",
    condition: "มือสอง",
    image: "https://images.unsplash.com/photo-1618961734760-466979ce35b0?w=500&q=80",
    seller: "น้องกวาง หอ A",
    location: "หอพักใน C4",
    timeAgo: "30 นาทีที่แล้ว",
  },
  {
    id: "3",
    title: "เสื้อช็อปวิทยาลัย Size L สภาพใหม่ ไม่เคยใส่",
    price: 290,
    category: "เสื้อผ้า / เครื่องแต่งกาย",
    condition: "ของใหม่",
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500&q=80",
    seller: "อาร์ม สาขาคอม",
    location: "โรงอาหารกลาง",
    timeAgo: "2 ชม. ที่แล้ว",
  },
  {
    id: "4",
    title: "จักรยานแม่บ้านปั่นในมอ ยี่ห้อ LA มีตะกร้าหน้า",
    price: 1100,
    category: "ยานพาหนะ",
    condition: "มือสอง",
    image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=500&q=80",
    seller: "เจมส์ ปี 4",
    location: "หน้าลานเกียร์",
    timeAgo: "5 ชม. ที่แล้ว",
  },
  {
    id: "5",
    title: "หูฟัง Bluetooth Sony WH-CH520 ตัดเสียงดี แบตอึด",
    price: 890,
    category: "อุปกรณ์ไอที",
    condition: "มือสอง",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
    seller: "เมย์ คณะบริหาร",
    location: "หน้าห้องสมุด",
    timeAgo: "1 วันที่แล้ว",
  },
];
