import React from 'react';
import './dashboard.scss';

const Dashboard = () => {
  const statsData = [
    {
      title: 'Total Codes',
      value: '10,000',
      change: '+12.5%',
      isPositive: true,
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      color: '#6366f1'
    },
    {
      title: 'Used Codes',
      value: '7,324',
      change: '+8.2%',
      isPositive: true,
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      color: '#10b981'
    },
    {
      title: 'Active Users',
      value: '1,432',
      change: '+5.3%',
      isPositive: true,
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      color: '#f59e0b'
    },
    {
      title: 'Available Codes',
      value: '2,676',
      change: '-3.1%',
      isPositive: false,
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      color: '#8b5cf6'
    }
  ];

  const recentActivity = [
    { user: 'Marc', code: 'VLUQUM-8387', gift: 'iPhone', time: '2 hours ago' },
    { user: 'Umar', code: 'VLTZMR-0982', gift: 'iPhone', time: '5 hours ago' },
    { user: 'Ramziddin', code: 'VLROBL-0349', gift: 'Airpods', time: '1 day ago' },
    { user: 'Sardor', code: 'VLSHLR-4894', gift: 'Watch', time: '1 day ago' },
    { user: 'Test', code: 'VLITCK-6548', gift: 'iPad', time: '2 days ago' }
  ];

  const chartData = [
    { day: 'Mon', codes: 120 },
    { day: 'Tue', codes: 180 },
    { day: 'Wed', codes: 150 },
    { day: 'Thu', codes: 220 },
    { day: 'Fri', codes: 280 },
    { day: 'Sat', codes: 190 },
    { day: 'Sun', codes: 240 }
  ];

  const maxValue = Math.max(...chartData.map(d => d.codes));

  return (
    <div className="dashboard">
      <div className="dashboard__stats">
        {statsData.map((stat, index) => (
          <div key={index} className="dashboard__stats-card">
            <div className="dashboard__stats-card__icon" style={{ background: `${stat.color}20`, color: stat.color }}>
              {stat.icon}
            </div>
            <div className="dashboard__stats-card__content">
              <p className="dashboard__stats-card__label">{stat.title}</p>
              <h3 className="dashboard__stats-card__value">{stat.value}</h3>
              <div className={`dashboard__stats-card__change ${stat.isPositive ? 'dashboard__stats-card__change--positive' : 'dashboard__stats-card__change--negative'}`}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d={stat.isPositive ? "M8 12V4M4 8l4-4 4 4" : "M8 4v8M4 8l4 4 4-4"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>{stat.change}</span>
                <span className="dashboard__stats-card__change-text">from last month</span>
              </div>
            </div>
          </div>
        ))}
      </div>
              
      <div className="dashboard__grid">
        <div className="dashboard__chart">
          <div className="dashboard__grid-card">
            <div className="dashboard__grid-card__header">
              <h3 className="dashboard__grid-card__title">Weekly Usage</h3>
              <select className="dashboard__grid-card__select">
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>Last 90 days</option>
              </select>
            </div>
            <div className="dashboard__grid-chart">
              <div className="dashboard__grid-chart__bars">
                {chartData.map((item, index) => (
                  <div key={index} className="dashboard__grid-chart__bar-wrapper">
                    <div className="dashboard__grid-chart__bar-container">
                      <div 
                        className="dashboard__grid-chart__bar"
                        style={{ height: `${(item.codes / maxValue) * 100}%` }}
                      >
                        <span className="dashboard__grid-chart__bar-tooltip">{item.codes}</span>
                      </div>
                    </div>
                    <span className="dashboard__grid-chart__label">{item.day}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard__activity">
          <div className="dashboard__activity-card">
            <div className="dashboard__activity-card__header">
              <h3 className="dashboard__activity-card__title">Recent Activity</h3>
              <button className="dashboard__activity-card__link">View all</button>
            </div>
            <div className="dashboard__activity-card-activity">
              {recentActivity.map((activity, index) => (
                <div key={index} className="dashboard__activity-card-activity__item">
                  <div className="dashboard__activity-card-activity__avatar">
                    {activity.user.charAt(0)}
                  </div>
                  <div className="dashboard__activity-card-activity__content">
                    <p className="dashboard__activity-card-activity__text">
                      <span className="dashboard__activity-card-activity__user">{activity.user}</span> used code{' '}
                      <span className="dashboard__activity-card-activity__code">{activity.code}</span>
                    </p>
                    <p className="dashboard__activity-card-activity__gift">{activity.gift}</p>
                  </div>
                  <span className="dashboard__activity-card-activity__time">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard__bottom">
        <div className="dashboard__bottom-card">
          <div className="dashboard__bottom-card__header">
            <h3 className="dashboard__bottom-card__title">Top Gifts</h3>
          </div>
          <div className="dashboard__bottom-gifts">
            <div className="dashboard__bottom-gift-item">
              <div className="dashboard__bottom-gift-item__info">
                <div className="dashboard__bottom-gift-item__icon" style={{ background: '#6366f120', color: '#6366f1' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <rect x="5" y="5" width="14" height="14" rx="3" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <span className="dashboard__bottom-gift-item__name">iPhone 15 Pro</span>
              </div>
              <div className="dashboard__bottom-gift-item__progress">
                <div className="dashboard__bottom-gift-item__progress-bar" style={{ width: '85%', background: '#6366f1' }}></div>
              </div>
              <span className="dashboard__bottom-gift-item__count">342 claimed</span>
            </div>
            <div className="dashboard__bottom-gift-item">
              <div className="dashboard__bottom-gift-item__info">
                <div className="dashboard__bottom-gift-item__icon" style={{ background: '#10b98120', color: '#10b981' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <rect x="5" y="5" width="14" height="14" rx="3" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <span className="dashboard__bottom-gift-item__name">AirPods Pro</span>
              </div>
              <div className="dashboard__bottom-gift-item__progress">
                <div className="dashboard__bottom-gift-item__progress-bar" style={{ width: '72%', background: '#10b981' }}></div>
              </div>
              <span className="dashboard__bottom-gift-item__count">289 claimed</span>
            </div>
            <div className="dashboard__bottom-gift-item">
              <div className="dashboard__bottom-gift-item__info">
                <div className="dashboard__bottom-gift-item__icon" style={{ background: '#f59e0b20', color: '#f59e0b' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <rect x="5" y="5" width="14" height="14" rx="3" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <span className="dashboard__bottom-gift-item__name">Apple Watch</span>
              </div>
              <div className="dashboard__bottom-gift-item__progress">
                <div className="dashboard__bottom-gift-item__progress-bar" style={{ width: '58%', background: '#f59e0b' }}></div>
              </div>
              <span className="dashboard__bottom-gift-item__count">234 claimed</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;