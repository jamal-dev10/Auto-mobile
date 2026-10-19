import React, { useState } from 'react';
import { ParkingLocation, BookingDetails } from '../types';
import { Reveal } from './Reveal';

interface ParkingFinderDemoProps {
  initialSelectedLocationId?: string;
  userPlate?: string;
}

const SAMPLE_LOCATIONS: ParkingLocation[] = [
  {
    id: 'cas-01',
    name: 'Twin Center Parking Garage',
    address: 'Boulevard Mohamed Zerktouni, Maarif',
    city: 'Casablanca',
    totalSpots: 180,
    availableSpots: 42,
    hourlyRate: 12,
    type: 'Covered',
    rating: 4.8,
    distanceKm: 0.6,
    coordinates: { lat: 33.5872, lng: -7.6321 },
  },
  {
    id: 'cas-02',
    name: 'Marina Mall Waterfront Parking',
    address: 'Boulevard des Almohades',
    city: 'Casablanca',
    totalSpots: 350,
    availableSpots: 118,
    hourlyRate: 15,
    type: 'Covered',
    rating: 4.9,
    distanceKm: 1.2,
    coordinates: { lat: 33.6063, lng: -7.6256 },
  },
  {
    id: 'cas-03',
    name: 'Casa-Port Intermodal Hub',
    address: 'Boulevard Houphouët Boigny',
    city: 'Casablanca',
    totalSpots: 220,
    availableSpots: 19,
    hourlyRate: 10,
    type: 'EV Charging',
    rating: 4.7,
    distanceKm: 1.8,
    coordinates: { lat: 33.6006, lng: -7.6144 },
  },
  {
    id: 'cas-04',
    name: 'Place des Nations Unies Plaza',
    address: 'Avenue Hassan II / Centre Ville',
    city: 'Casablanca',
    totalSpots: 140,
    availableSpots: 8,
    hourlyRate: 14,
    type: 'Valet',
    rating: 4.6,
    distanceKm: 2.1,
    coordinates: { lat: 33.5951, lng: -7.6186 },
  },
  {
    id: 'cas-05',
    name: 'Hassan II Mosque Seafront Lot',
    address: 'Boulevard Sidi Mohammed Ben Abdellah',
    city: 'Casablanca',
    totalSpots: 400,
    availableSpots: 194,
    hourlyRate: 8,
    type: 'Outdoor',
    rating: 4.9,
    distanceKm: 2.9,
    coordinates: { lat: 33.6086, lng: -7.6327 },
  },
];

export const ParkingFinderDemo: React.FC<ParkingFinderDemoProps> = ({ userPlate }) => {
  const [locations] = useState<ParkingLocation[]>(SAMPLE_LOCATIONS);
  const [selectedType, setSelectedType] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeLocation, setActiveLocation] = useState<ParkingLocation | null>(null);

  // Booking Form State
  const [vehiclePlate, setVehiclePlate] = useState(userPlate || '12345-A-6');

  // Update vehicle plate if userPlate changes (e.g. on login)
  React.useEffect(() => {
    if (userPlate) {
      setVehiclePlate(userPlate);
    }
  }, [userPlate]);
  const [selectedHours, setSelectedHours] = useState<number>(2);
  const [selectedSpotBay, setSelectedSpotBay] = useState<string>('A-08');
  const [activeTicket, setActiveTicket] = useState<BookingDetails | null>(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const filteredLocations = locations.filter((loc) => {
    const matchesType = selectedType === 'All' || loc.type === selectedType;
    const matchesSearch =
      loc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      loc.address.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const handleStartBooking = (loc: ParkingLocation) => {
    setActiveLocation(loc);
    setSelectedSpotBay(`B-${Math.floor(Math.random() * 20 + 1).toString().padStart(2, '0')}`);
    setBookingSuccess(false);
  };

  const handleConfirmReservation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeLocation) return;

    const ticket: BookingDetails = {
      locationId: activeLocation.id,
      locationName: activeLocation.name,
      spotNumber: selectedSpotBay,
      vehiclePlate: vehiclePlate.toUpperCase(),
      hours: selectedHours,
      totalAmount: activeLocation.hourlyRate * selectedHours,
      startTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      bookingCode: `AUTO-${Math.random().toString(36).substring(2, 7).toUpperCase()}`,
    };

    setActiveTicket(ticket);
    setBookingSuccess(true);
  };

  return (
    <section id="finder" className="parking-demo-section section-padding">
      <div className="container">
        <Reveal animation="fade-up" duration={700}>
          <div className="sectioner-header" style={{ marginBottom: '45px' }}>
            <span className="demo-badge">Interactive Live App</span>
            <h3>Live Parking Finder & Reservation</h3>
            <span className="line"></span>
            <p>
              Experience our real-time spot tracking engine in Casablanca. Check live bay occupancy, compare rates, and book your guaranteed space ahead of arrival.
            </p>
          </div>
        </Reveal>

        {/* Filter and Search Bar */}
        <Reveal animation="fade-up" delay={150} duration={750}>
          <div
            style={{
              background: '#ffffff',
              padding: '20px',
              borderRadius: '16px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
              marginBottom: '30px',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '15px',
              alignItems: 'center',
              justifyContent: 'space-between',
              border: '1px solid #edf0f5',
            }}
          >
          {/* Search Input */}
          <div style={{ position: 'relative', flex: '1 1 280px', maxWidth: '400px' }}>
            <i
              className="fas fa-search"
              style={{ position: 'absolute', left: '16px', top: '15px', color: '#9aa0a6' }}
            ></i>
            <input
              type="text"
              placeholder="Search garage or neighborhood..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px 12px 42px',
                borderRadius: '25px',
                border: '1px solid #e2e8f0',
                background: '#f8fafc',
                marginBottom: 0,
                fontSize: '13.5px',
              }}
            />
          </div>

          {/* Type Filter Pills */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {['All', 'Covered', 'EV Charging', 'Valet', 'Outdoor'].map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`spot-pill ${selectedType === type ? 'active' : ''}`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
        </Reveal>

        {/* Active Ticket Banner if any */}
        {activeTicket && (
          <Reveal animation="zoom-in" duration={600}>
            <div
              style={{
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                color: 'white',
                borderRadius: '14px',
                padding: '20px 24px',
                marginBottom: '30px',
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '15px',
                boxShadow: '0 8px 24px rgba(16, 185, 129, 0.25)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div
                  style={{
                    width: '45px',
                    height: '45px',
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '20px',
                  }}
                >
                  <i className="fas fa-check-circle"></i>
                </div>
                <div>
                  <h4 style={{ margin: 0, fontSize: '17px', color: '#fff' }}>
                    Spot {activeTicket.spotNumber} Reserved at {activeTicket.locationName}
                  </h4>
                  <p style={{ margin: '3px 0 0', opacity: 0.9, fontSize: '13px' }}>
                    Code: <strong>{activeTicket.bookingCode}</strong> &bull; Plate: {activeTicket.vehiclePlate} &bull; {activeTicket.hours} hrs ({activeTicket.totalAmount} MAD)
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActiveTicket(null)}
                style={{
                  background: 'rgba(255,255,255,0.25)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '20px',
                  padding: '6px 16px',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontWeight: 600,
                }}
              >
                Dismiss Pass
              </button>
            </div>
          </Reveal>
        )}

        {/* Locations Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
          {filteredLocations.map((loc, idx) => {
            const occupancyRatio = loc.availableSpots / loc.totalSpots;
            const statusColor = occupancyRatio > 0.25 ? '#10b981' : occupancyRatio > 0.1 ? '#f59e0b' : '#ef4444';
            const statusText = occupancyRatio > 0.25 ? 'Available' : occupancyRatio > 0.1 ? 'Filling Fast' : 'Almost Full';

            return (
              <Reveal key={loc.id} animation="fade-up" delay={(idx % 3) * 120} duration={750}>
                <div className="spot-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                  <span
                    style={{
                      background: '#f3e8ff',
                      color: '#7a60ff',
                      fontSize: '11px',
                      fontWeight: 700,
                      padding: '3px 10px',
                      borderRadius: '12px',
                      textTransform: 'uppercase',
                    }}
                  >
                    {loc.type}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', color: '#f59e0b', fontWeight: 600 }}>
                    <i className="fas fa-star"></i>
                    <span>{loc.rating}</span>
                  </div>
                </div>

                <h4 style={{ fontSize: '18px', color: '#1f2937', marginBottom: '6px' }}>{loc.name}</h4>
                <p style={{ color: '#6b7280', fontSize: '13px', margin: '0 0 16px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <i className="fas fa-map-marker-alt" style={{ color: '#7a60ff' }}></i>
                  {loc.address}, {loc.city} ({loc.distanceKm} km away)
                </p>

                {/* Occupancy Indicator Bar */}
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '6px' }}>
                    <span style={{ fontWeight: 600, color: statusColor }}>
                      <i className="fas fa-circle" style={{ fontSize: '8px', marginRight: '5px' }}></i>
                      {statusText}
                    </span>
                    <span style={{ color: '#4b5563', fontWeight: 500 }}>
                      <strong>{loc.availableSpots}</strong> / {loc.totalSpots} spots free
                    </span>
                  </div>
                  <div style={{ height: '6px', background: '#e5e7eb', borderRadius: '3px', overflow: 'hidden' }}>
                    <div
                      style={{
                        height: '100%',
                        width: `${((loc.totalSpots - loc.availableSpots) / loc.totalSpots) * 100}%`,
                        background: statusColor,
                        borderRadius: '3px',
                      }}
                    ></div>
                  </div>
                </div>

                {/* Footer with Price and Book button */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '14px', borderTop: '1px solid #f3f4f6' }}>
                  <div>
                    <span style={{ fontSize: '19px', fontWeight: 800, color: '#7a60ff' }}>{loc.hourlyRate} MAD</span>
                    <span style={{ fontSize: '12px', color: '#6b7280' }}> / hr</span>
                  </div>
                  <button
                    onClick={() => handleStartBooking(loc)}
                    style={{
                      background: 'linear-gradient(135deg, #7a60ff, #cd9ffa)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '20px',
                      padding: '8px 18px',
                      fontSize: '13px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      boxShadow: '0 3px 10px rgba(122,96,255,0.25)',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    Reserve Now
                  </button>
                </div>
              </div>
              </Reveal>
            );
          })}
        </div>

        {/* Modal for Spot Reservation */}
        {activeLocation && (
          <div
            className="video-modal-backdrop"
            onClick={() => setActiveLocation(null)}
          >
            <div
              className="video-modal-box"
              onClick={(e) => e.stopPropagation()}
              style={{
                maxWidth: '520px',
                background: '#ffffff',
                color: '#333',
                padding: '30px',
                borderRadius: '20px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 style={{ fontSize: '20px', fontWeight: 700, margin: 0 }}>
                  {bookingSuccess ? 'Booking Confirmed!' : `Reserve at ${activeLocation.name}`}
                </h3>
                <button
                  onClick={() => setActiveLocation(null)}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '20px',
                    color: '#999',
                    cursor: 'pointer',
                  }}
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>

              {bookingSuccess && activeTicket ? (
                <div style={{ textAlign: 'center', padding: '15px 0' }}>
                  <div
                    style={{
                      width: '70px',
                      height: '70px',
                      borderRadius: '50%',
                      background: '#ecfdf5',
                      color: '#10b981',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '32px',
                      margin: '0 auto 15px',
                    }}
                  >
                    <i className="fas fa-check"></i>
                  </div>
                  <h4 style={{ fontSize: '18px', marginBottom: '8px' }}>Your Parking Bay is Secured</h4>
                  <p style={{ color: '#6b7280', fontSize: '13.5px', marginBottom: '20px' }}>
                    Show this digital ticket or scanning code at the garage barrier upon entry.
                  </p>

                  <div
                    style={{
                      background: '#f9fafb',
                      border: '2px dashed #d1d5db',
                      borderRadius: '12px',
                      padding: '16px',
                      marginBottom: '25px',
                      textAlign: 'left',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ color: '#6b7280', fontSize: '13px' }}>Parking Space:</span>
                      <strong style={{ color: '#7a60ff', fontSize: '16px' }}>Bay {activeTicket.spotNumber}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ color: '#6b7280', fontSize: '13px' }}>Pass Code:</span>
                      <strong style={{ letterSpacing: '1px' }}>{activeTicket.bookingCode}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ color: '#6b7280', fontSize: '13px' }}>Vehicle Plate:</span>
                      <span>{activeTicket.vehiclePlate}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#6b7280', fontSize: '13px' }}>Total Paid:</span>
                      <strong>{activeTicket.totalAmount} MAD ({activeTicket.hours} hrs)</strong>
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveLocation(null)}
                    className="btn-grad"
                    style={{ width: '100%' }}
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={handleConfirmReservation}>
                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: '#4b5563', marginBottom: '6px' }}>
                      Vehicle Plate Number
                    </label>
                    <input
                      type="text"
                      required
                      value={vehiclePlate}
                      onChange={(e) => setVehiclePlate(e.target.value)}
                      placeholder="e.g. 12345-A-6"
                      className="form-input-custom"
                      style={{ marginBottom: 0 }}
                    />
                  </div>

                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: '#4b5563', marginBottom: '6px' }}>
                      Allocated Bay
                    </label>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      {['A-04', 'B-12', 'C-09', 'D-02'].map((bay) => (
                        <button
                          key={bay}
                          type="button"
                          onClick={() => setSelectedSpotBay(bay)}
                          style={{
                            flex: 1,
                            padding: '8px',
                            borderRadius: '8px',
                            border: selectedSpotBay === bay ? '2px solid #7a60ff' : '1px solid #e2e8f0',
                            background: selectedSpotBay === bay ? '#f3e8ff' : '#ffffff',
                            color: selectedSpotBay === bay ? '#7a60ff' : '#4b5563',
                            fontWeight: 700,
                            cursor: 'pointer',
                          }}
                        >
                          {bay}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div style={{ marginBottom: '22px' }}>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: '#4b5563', marginBottom: '6px' }}>
                      Duration
                    </label>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      {[1, 2, 4, 8].map((hrs) => (
                        <button
                          key={hrs}
                          type="button"
                          onClick={() => setSelectedHours(hrs)}
                          style={{
                            flex: 1,
                            padding: '8px',
                            borderRadius: '8px',
                            border: selectedHours === hrs ? '2px solid #7a60ff' : '1px solid #e2e8f0',
                            background: selectedHours === hrs ? '#f3e8ff' : '#ffffff',
                            color: selectedHours === hrs ? '#7a60ff' : '#4b5563',
                            fontWeight: 700,
                            cursor: 'pointer',
                          }}
                        >
                          {hrs} hr{hrs > 1 ? 's' : ''}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div
                    style={{
                      background: '#f8fafc',
                      borderRadius: '10px',
                      padding: '12px 16px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '20px',
                    }}
                  >
                    <span style={{ fontSize: '13px', color: '#6b7280' }}>Total Estimation:</span>
                    <span style={{ fontSize: '20px', fontWeight: 800, color: '#7a60ff' }}>
                      {activeLocation.hourlyRate * selectedHours} MAD
                    </span>
                  </div>

                  <button type="submit" className="btn-grad">
                    Confirm &amp; Generate Pass
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
