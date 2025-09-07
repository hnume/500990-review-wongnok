import { useState, useEffect } from 'react';
import Head from 'next/head';
import ProfileCard from '../components/ProfileCard';

const Profiles = () => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchProfiles();
  }, [currentPage, limit]);

  const fetchProfiles = async () => {
    try {
      setLoading(true);
      // เรียกใช้ API จริง
      const response = await fetch(`http://localhost:3000/my-test?limit=${limit}&page=${currentPage}`);
      const data = await response.json();
      
      setProfiles(data);
    } catch (error) {
      console.error('Error fetching profiles:', error);
      // ใช้ข้อมูลตัวอย่างหาก API ไม่สามารถเรียกได้
      setProfiles(generateSampleData(limit));
    } finally {
      setLoading(false);
    }
  };

  // ฟังก์ชันสำหรับสร้างข้อมูลตัวอย่าง (ใช้เมื่อ API ไม่พร้อม)
  const generateSampleData = (limit) => {
    const sampleData = [];
    const names = ['สมชาย ใจดี', 'สุนิสา เก่งเร็ว', 'อนุชา พัฒนา', 'เมธาวี สุขใจ', 'ณัฐพล กล้าหาญ', 
                  'พรพิมล วิเศษ', 'เอกชัย เกิดผล', 'กนกวรรณ สวยงาม', 'ธนวัฒน์ มั่นคง', 'จิราพร อบอุ่น'];
    const positions = ['Developer', 'Designer', 'Manager', 'Analyst', 'Marketing', 'Support', 'Sales'];
    
    for (let i = 0; i < limit; i++) {
      const name = names[i % names.length];
      const email = name.toLowerCase().replace(/\s/g, '') + '@example.com';
      
      sampleData.push({
        id: i + 1,
        name: name,
        email: email,
        position: positions[i % positions.length],
        avatar: `https://i.pravatar.cc/150?img=${(i % 10) + 1}`,
        followers: Math.floor(Math.random() * 1000),
        following: Math.floor(Math.random() * 500),
        posts: Math.floor(Math.random() * 100)
      });
    }
    
    return sampleData;
  };

  const filteredProfiles = profiles.filter(profile =>
    profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    profile.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container py-5">
      <Head>
        <title>ระบบแสดงโปรไฟล์</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </Head>

      <div className="row mb-4">
        <div className="col text-center">
          <h1 className="display-4 mb-3">ระบบแสดงโปรไฟล์</h1>
          <p className="lead">แสดงข้อมูลโปรไฟล์จาก API ที่ระบุ</p>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-md-6">
          <div className="input-group">
            <span className="input-group-text"><i className="fas fa-search"></i></span>
            <input
              type="text"
              className="form-control"
              placeholder="ค้นหาชื่อหรืออีเมล..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-3">
          <select
            className="form-select"
            value={limit}
            onChange={(e) => setLimit(parseInt(e.target.value))}
          >
            <option value="5">แสดง 5 รายการ</option>
            <option value="10">แสดง 10 รายการ</option>
            <option value="15">แสดง 15 รายการ</option>
          </select>
        </div>
        <div className="col-md-3">
          <button className="btn btn-primary w-100" onClick={fetchProfiles}>
            <i className="fas fa-sync-alt me-2"></i>รีเฟรชข้อมูล
          </button>
        </div>
      </div>

      {loading ? (
        <div className="loader">
          <div className="spinner-border loader-spinner text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {filteredProfiles.map(profile => (
              <div key={profile.id} className="col">
                <ProfileCard profile={profile} />
              </div>
            ))}
          </div>

          {filteredProfiles.length === 0 && (
            <div className="col-12 text-center py-5">
              <i className="fas fa-user-slash fa-3x text-muted mb-3"></i>
              <h4>ไม่พบโปรไฟล์ที่ค้นหา</h4>
              <p>ลองเปลี่ยนคำค้นหาหรือลองใหม่ในภายหลัง</p>
            </div>
          )}
        </>
      )}

      <div className="row mt-4">
        <div className="col">
          <nav aria-label="Page navigation">
            <ul className="pagination justify-content-center">
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button
                  className="page-link"
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  ก่อนหน้า
                </button>
              </li>
              <li className="page-item active">
                <span className="page-link">{currentPage}</span>
              </li>
              <li className="page-item">
                <button
                  className="page-link"
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  ถัดไป
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <style jsx global>{`
        body {
          background-color: #f8f9fa;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        .profile-card {
          border-radius: 15px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s;
          overflow: hidden;
          background: white;
          height: 100%;
        }
        .profile-card:hover {
          transform: translateY(-5px);
        }
        .profile-header {
          background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
          padding: 20px;
          text-align: center;
          color: white;
        }
        .profile-img {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          border: 4px solid white;
          margin: 0 auto;
          object-fit: cover;
          background-color: #f8f9fa;
        }
        .profile-info {
          padding: 20px;
        }
        .stats {
          display: flex;
          justify-content: space-around;
          border-top: 1px solid #eee;
          padding: 15px 0;
        }
        .stat-item {
          text-align: center;
        }
        .pagination {
          margin: 30px 0;
        }
        .loader {
          display: flex;
          justify-content: center;
          padding: 40px;
        }
        .loader-spinner {
          width: 3rem;
          height: 3rem;
        }
      `}</style>
    </div>
  );
};

export default Profiles;