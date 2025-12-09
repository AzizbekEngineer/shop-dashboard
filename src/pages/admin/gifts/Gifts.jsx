import React, { useState } from 'react';
import './gifts.scss';

const Gifts = () => {
  const [giftAssignments, setGiftAssignments] = useState([
    { id: 12191, code: 'VLMEAA-5183', gift: 'IPhone 15Pro', usedBy: 'Шахриёр Хакимов', usedAt: '2023-11-08 18:38:33' },
    { id: 12192, code: 'VLRL0R-9004', gift: 'Macebook', usedBy: 'Шахриёр Хакимов', usedAt: '2023-11-08 18:37:36' },
    { id: 68093, code: 'VLDPSZ-2151', gift: 'IPhone 12Pro', usedBy: 'Шахриёр Хакимов', usedAt: '2023-11-08 18:38:04' },
    { id: 68092, code: 'VLNGEQ-1086', gift: 'AirPods Pro', usedBy: 'Шахриёр Хакимов', usedAt: '2023-11-08 18:36:58' },
    { id: 68095, code: 'VLVNWL-1151', gift: 'PlayStation 5', usedBy: 'Шахриёр Хакимов', usedAt: '2023-11-08 18:36:35' },
    { id: 68094, code: 'VLCHEM-4139', gift: 'Samsung Galaxy S24', usedBy: 'Шахриёр Хакимов', usedAt: '2023-11-08 18:36:04' },
    { id: 38726, code: 'VLRVND-9712', gift: 'Macebook', usedBy: 'Шахриёр Хакимов', usedAt: '2023-11-08 18:35:40' },
    { id: 55787, code: 'VLGGDT-7968', gift: 'IPhone 15Pro', usedBy: 'Шахриёр Хакимов', usedAt: '2023-11-08 18:34:37' },
    { id: 38727, code: 'VLFGAP-0424', gift: 'Macebook', usedBy: 'Шахриёр Хакимов', usedAt: '2023-11-08 18:34:00' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingAssignment, setEditingAssignment] = useState(null);
  const [formData, setFormData] = useState({ gift: '' });

  const availableGifts = ['iPhone 15Pro', 'Macebook', 'Samsung Galaxy S24', 'AirPods Pro', 'PlayStation 5', 'Xbox Series X', 'iPad Pro', 'Apple Watch'];

  const handleEdit = (assignment) => {
    setEditingAssignment(assignment);
    setFormData({ gift: assignment.gift });
    setShowModal(true);
  };

  const handleSubmit = () => {
    setGiftAssignments(
      giftAssignments.map(a => 
        a.id === editingAssignment.id ? { ...a, gift: formData.gift } : a
      )
    );
    setShowModal(false);
  };

  const filteredAssignments = giftAssignments.filter(a => 
    a.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.gift.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.usedBy.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    total: giftAssignments.length,
    assigned: giftAssignments.filter(a => a.gift).length,
    unassigned: giftAssignments.filter(a => !a.gift).length
  };

  return (
    <div className="gifts">
      <div className="gifts__header">
        
        <div className="gifts__search-wrapper">
          <input
            type="text"
            className="gifts__search"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="gifts__header-actions">

          <select className="gifts__select">
            <option>All data</option>
            <option>Assigned</option>
            <option>Unassigned</option>
          </select>

          <button className="gifts__icon-btn">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"/>
            </svg>
          </button>

          <button className="gifts__icon-btn">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"/>
            </svg>
          </button>

        </div>
      </div>

      <div className="gifts__table-wrapper">
        <table className="gifts__table">

          <thead>
            <tr>
              <th>INDEX</th>
              <th>VALUE</th>
              <th>GIFT</th>
              <th>USED AT</th>
            </tr>
          </thead>

          {/* <tbody>
            {filteredAssignments.map(assignment => (
              <tr key={assignment.id}>
                <td className="gifts__index">{assignment.id}</td>
                <td className="gifts__code">{assignment.code}</td>
                <td className="gifts__gift-name">
                  {assignment.gift || <span className="gifts__empty">-</span>}
                </td>
                <td className="gifts__date">{assignment.usedAt}</td>
              </tr>
            ))}
          </tbody> */}

        </table>
      </div>

      {showModal && (
        <div className="gifts__modal" onClick={() => setShowModal(false)}>
          <div className="gifts__modal-content" onClick={(e) => e.stopPropagation()}>
            <h2 className="gifts__modal-title">Sovg'a belgilash</h2>

            <div className="gifts__modal-info">
              <div className="gifts__info-row">
                <span className="gifts__info-label">Stiker kodi:</span>
                <span className="gifts__info-value">{editingAssignment?.code}</span>
              </div>
              <div className="gifts__info-row">
                <span className="gifts__info-label">Foydalanuvchi:</span>
                <span className="gifts__info-value">{editingAssignment?.usedBy}</span>
              </div>
            </div>

            <div className="gifts__form">

              <div className="gifts__form-group">
                <label>Sovg'ani tanlang</label>
                <select 
                  value={formData.gift} 
                  onChange={(e) => setFormData({ gift: e.target.value })}
                >
                  <option value="">Sovg'a tanlanmagan</option>
                  {availableGifts.map(gift => (
                    <option key={gift} value={gift}>{gift}</option>
                  ))}
                </select>
              </div>

              <div className="gifts__form-actions">
                <button className="gifts__btn gifts__btn--save" onClick={handleSubmit}>
                  Saqlash
                </button>
                <button className="gifts__btn gifts__btn--cancel" onClick={() => setShowModal(false)}>
                  Bekor qilish
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gifts;