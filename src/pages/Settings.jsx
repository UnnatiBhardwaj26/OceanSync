import { useState } from "react";

const SETTINGS_TABS = [
  { icon: "👤", label: "Profile" },
  { icon: "🏢", label: "Organization" },
  { icon: "≡", label: "Platform Configuration" },
  { icon: "✺", label: "Sensor Configuration" },
  { icon: "👥", label: "Users & Roles" },
  { icon: "🛈", label: "Security" },

  
];

function Toggle({ checked, onChange }) {
  return (
    <label className="settings-toggle">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />

      <span />
    </label>
  );
}

function Badge({ status }) {
  return (
    <span
      className={
        status === "Active"
          ? "settings-status-enabled"
          : "settings-status-disabled"
      }
    >
      {status}
    </span>
  );
}

export default function Settings() {
  const [activeTab, setActiveTab] = useState("Profile");
  const [profile, setProfile] = useState({
    fullName: "Operator",
    jobTitle: "Platform Administrator",
    email: "abc@oceanobs.org",
    phone: "+1 (808) 555-0148",
    });
  const [org, setOrg] = useState({
    name: "Pacific Ocean Observation Network",
    type: "Research Institution",
    website: "https://oceanobs.org",
    supportEmail: "support@oceanobs.org",
    address: "Kerela,India",
  });
  const [platform, setPlatform] = useState({
    id: "OOP-PAC-01",
    environment: "Production",
    syncInterval: "15 minutes",
    rawRetention: "180",
    aggRetention: "1825",
    autoArchive: true,
    maintDay: "Sunday",
    maintTime: "02:00",
    notifyBefore: true,
  });
  const [sensor, setSensor] = useState({
    samplingRate: "5 minutes",
    calibrationInterval: "90",
    autoReminders: true,
    tempWarning: "",
    batteryWarning: "20",
    signalTimeout: "30",
    firmwareChannel: "Stable",
    autoUpdate: false,
  });
  const [users, setUsers] = useState([
    { name: "ABC", email: "abc@oceanobs.org", role: "Administrator", status: "Active" },
    { name: "ABC", email: "abc@oceanobs.org", role: "Data Analyst", status: "Active" },
    { name: "ABC", email: "abc@oceanobs.org", role: "Viewer", status: "Invited" },
  ]);
  const [inviteEmail, setInviteEmail] = useState("");
  const [security, setSecurity] = useState({
    sessionTimeout: "30 minutes",
    reauth: true,
    
  });
  const loginActivity = [
    { when: "Today, 8:12 AM", where: "Kerela, India", device: "Chrome on macOS" },
    { when: "Sep 25, 4:47 PM", where: "Kerela, India", device: "Chrome on macOS" },
    { when: "Sep 21, 11:03 AM", where: "Kerela, India", device: "Chrome on macOS" },
  ];

  const setUserRole = (idx, role) =>
    setUsers((list) => list.map((u, i) => (i === idx ? { ...u, role } : u)));
  const removeUser = (idx) => setUsers((list) => list.filter((_, i) => i !== idx));
  const inviteUser = () => {
    if (!inviteEmail.trim()) return;
    setUsers((list) => [...list, { name: inviteEmail, email: inviteEmail, role: "Viewer", status: "Invited" }]);
    setInviteEmail("");
  };

  const orgField = (field) => (e) => {
  setOrg((prev) => ({
    ...prev,
    [field]: e.target.value,
  }));
};

const platformField = (field) => (e) => {
  setPlatform((prev) => ({
    ...prev,
    [field]: e.target.value,
  }));
};

const sensorField = (field) => (e) => {
  setSensor((prev) => ({
    ...prev,
    [field]: e.target.value,
  }));
};

const toggle = (setter, field) => (checked) => {
  setter((prev) => ({
    ...prev,
    [field]: checked,
  }));
};


  const handleChange = (field) => (e) =>
    setProfile((p) => ({ ...p, [field]: e.target.value }));

  return (
        <div className="settings-content">
          <div className="settings-page-head">
            <h1>Settings</h1>
            <p>Manage your profile, platform configuration, sensor configuration, and system preferences.</p>
          </div>

          <div className="settings-layout">
            <nav className="settings-nav">
              {SETTINGS_TABS.map((tab) => (
                <button
                  key={tab.label}
                  id="settings-text"
                  className={`settings-tab ${activeTab === tab.label ? "is-active" : ""}`}
                  onClick={() => setActiveTab(tab.label)}
                >
                  <span className="settings-tab-icon">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </nav>

            <div className="settings-panel">
                {/* Profile */}
              {activeTab === "Profile" && (
                <>
                  <div className="settings-card settings-profile-header">
                    <div className="settings-profile-id">
                      <div className="settings-avatar">OS</div>
                      <div>
                        <div className="settings-profile-name">{profile.fullName}</div>
                        <div className="settings-profile-meta">
                          {profile.jobTitle} · Research Division
                        </div>
                      </div>
                    </div>
                    <div className="settings-profile-actions">
                      <button className="settings-btn settings-btn-secondary">Change photo</button>
                      <button className="settings-btn settings-btn-primary">Save changes</button>
                    </div>
                  </div>

                  <div className="settings-card">
                    <div className="settings-card-heading">
                      <h2>Personal information</h2>
                      <p>Your name and contact details as they appear across the platform.</p>
                    </div>

                    <div className="settings-form-grid">
                      <label className="settings-field">
                        <span>Full name</span>
                        <input value={profile.fullName} onChange={handleChange("fullName")} />
                      </label>
                      <label className="settings-field">
                        <span>Job title</span>
                        <input value={profile.jobTitle} onChange={handleChange("jobTitle")} />
                      </label>
                      <label className="settings-field">
                        <span>Email address</span>
                        <input value={profile.email} onChange={handleChange("email")} />
                      </label>
                      <label className="settings-field">
                        <span>Phone number</span>
                        <input value={profile.phone} onChange={handleChange("phone")} />
                      </label>
                      
                      
                    </div>
                  </div>

                  <div className="settings-card settings-security-row">
                    <div>
                      <h2>Password</h2>
                      <p>Last changed 74 days ago.</p>
                    </div>
                    <button className="settings-btn settings-btn-secondary">Change password</button>
                  </div>

                  <div className="settings-card settings-security-row">
                    <div>
                      <h2>Two-factor authentication</h2>
                      <p>Manage under the Security tab.</p>
                    </div>
                    <span className="settings-status-enabled">Enabled</span>
                  </div>
                </>)}
            
              
                {/* ---------------- ORGANIZATION ---------------- */}
              {activeTab === "Organization" && (
                <>
                  <div className="settings-card">
                    <div className="settings-card-heading">
                      <h2>Organization details</h2>
                      <p>Shown on shared reports and in outgoing alert emails.</p>
                    </div>
                    <div className="settings-form-grid">
                      <label className="settings-field">
                        <span>Organization name</span>
                        <input value={org.name} onChange={orgField("name")} />
                      </label>
                      <label className="settings-field">
                        <span>Organization type</span>
                        <select value={org.type} onChange={orgField("type")}>
                          <option>Research Institution</option>
                          <option>Government Agency</option>
                          <option>Commercial Operator</option>
                          <option>Non-profit</option>
                        </select>
                      </label>
                      <label className="settings-field">
                        <span>Website</span>
                        <input value={org.website} onChange={orgField("website")} />
                      </label>
                      <label className="settings-field">
                        <span>Support email</span>
                        <input value={org.supportEmail} onChange={orgField("supportEmail")} />
                      </label>
                      <label className="settings-field settings-field-wide">
                        <span>Mailing address</span>
                        <input value={org.address} onChange={orgField("address")} />
                      </label>
                    </div>
                  </div>

                  
                </>
              )}
              {/* ---------------- PLATFORM CONFIGURATION ---------------- */}
              {activeTab === "Platform Configuration" && (
                <>
                  <div className="settings-card">
                    <div className="settings-card-heading">
                      <h2>Deployment settings</h2>
                      <p>Core settings for how this platform instance runs.</p>
                    </div>
                    <div className="settings-form-grid">
                      <label className="settings-field">
                        <span>Platform ID</span>
                        <input value={platform.id} disabled />
                      </label>
                      <label className="settings-field">
                        <span>Environment</span>
                        <select value={platform.environment} onChange={platformField("environment")}>
                          <option>Production</option>
                          <option>Staging</option>
                        </select>
                      </label>
                      <label className="settings-field">
                        <span>Data sync interval</span>
                        <select value={platform.syncInterval} onChange={platformField("syncInterval")}>
                          <option>5 minutes</option>
                          <option>15 minutes</option>
                          <option>1 hour</option>
                        </select>
                      </label>
                    </div>
                  </div>

                  <div className="settings-card">
                    <div className="settings-card-heading">
                      <h2>Data retention</h2>
                      <p>How long raw and aggregated readings are kept before archiving.</p>
                    </div>
                    <div className="settings-form-grid">
                      <label className="settings-field">
                        <span>Raw sensor data (days)</span>
                        <input value={platform.rawRetention} onChange={platformField("rawRetention")} />
                      </label>
                      <label className="settings-field">
                        <span>Aggregated data (days)</span>
                        <input value={platform.aggRetention} onChange={platformField("aggRetention")} />
                      </label>
                    </div>
                    <div className="settings-toggle-row">
                      <div>
                        <div className="settings-toggle-title">Auto-archive expired data</div>
                        <p>Move data past its retention window to cold storage automatically.</p>
                      </div>
                      <Toggle checked={platform.autoArchive} onChange={toggle(setPlatform, "autoArchive")} />
                    </div>
                  </div>

                  <div className="settings-card">
                    <div className="settings-card-heading">
                      <h2>Maintenance window</h2>
                      <p>When routine platform maintenance is scheduled.</p>
                    </div>
                    <div className="settings-form-grid">
                      <label className="settings-field">
                        <span>Preferred day</span>
                        <select value={platform.maintDay} onChange={platformField("maintDay")}>
                          <option>Sunday</option>
                          <option>Saturday</option>
                          <option>Wednesday</option>
                        </select>
                      </label>
                      <label className="settings-field">
                        <span>Preferred time</span>
                        <input type="time" value={platform.maintTime} onChange={platformField("maintTime")} />
                      </label>
                    </div>
                    <div className="settings-toggle-row">
                      <div>
                        <div className="settings-toggle-title">Notify before maintenance</div>
                        <p>Email admins 24 hours ahead of a scheduled window.</p>
                      </div>
                      <Toggle checked={platform.notifyBefore} onChange={toggle(setPlatform, "notifyBefore")} />
                    </div>
                  </div>
                </>
              )}
              {/* ---------------- SENSOR CONFIGURATION ---------------- */}
              {activeTab === "Sensor Configuration" && (
                <>
                  <div className="settings-card">
                    <div className="settings-card-heading">
                      <h2>Sampling defaults</h2>
                      <p>Applied to newly registered sensors unless overridden per device.</p>
                    </div>
                    <div className="settings-form-grid">
                      <label className="settings-field">
                        <span>Default sampling rate</span>
                        <select value={sensor.samplingRate} onChange={sensorField("samplingRate")}>
                          <option>1 minute</option>
                          <option>5 minutes</option>
                          <option>15 minutes</option>
                        </select>
                      </label>
                      <label className="settings-field">
                        <span>Calibration interval (days)</span>
                        <input value={sensor.calibrationInterval} onChange={sensorField("calibrationInterval")} />
                      </label>
                    </div>
                    <div className="settings-toggle-row">
                      <div>
                        <div className="settings-toggle-title">Automatic calibration reminders</div>
                        <p>Notify the assigned technician when a sensor is due for calibration.</p>
                      </div>
                      <Toggle checked={sensor.autoReminders} onChange={toggle(setSensor, "autoReminders")} />
                    </div>
                  </div>

                  <div className="settings-card">
                    <div className="settings-card-heading">
                      <h2>Default thresholds</h2>
                      <p>Baseline warning levels new sensors inherit.</p>
                    </div>
                    <div className="settings-form-grid">
                      <label className="settings-field">
                        <span>Temperature warning (°C)</span>
                        <input value={sensor.tempWarning} onChange={sensorField("tempWarning")} />
                      </label>
                      <label className="settings-field">
                        <span>Battery low warning (%)</span>
                        <input value={sensor.batteryWarning} onChange={sensorField("batteryWarning")} />
                      </label>
                      <label className="settings-field">
                        <span>Signal loss timeout (minutes)</span>
                        <input value={sensor.signalTimeout} onChange={sensorField("signalTimeout")} />
                      </label>
                    </div>
                  </div>

                  <div className="settings-card">
                    <div className="settings-card-heading">
                      <h2>Firmware</h2>
                    </div>
                    <div className="settings-form-grid">
                      <label className="settings-field">
                        <span>Update channel</span>
                        <select value={sensor.firmwareChannel} onChange={sensorField("firmwareChannel")}>
                          <option>Stable</option>
                          <option>Beta</option>
                        </select>
                      </label>
                    </div>
                    <div className="settings-toggle-row">
                      <div>
                        <div className="settings-toggle-title">Auto-update firmware</div>
                        <p>Install updates on the next scheduled maintenance window.</p>
                      </div>
                      <Toggle checked={sensor.autoUpdate} onChange={toggle(setSensor, "autoUpdate")} />
                    </div>
                  </div>
                </>
              )}
              {/* ---------------- USERS & ROLES ---------------- */}
              {activeTab === "Users & Roles" && (
                <div className="settings-card">
                  <div className="settings-card-heading">
                    <h2>Team members</h2>
                    <p>Manage who can access this platform and what they can do.</p>
                  </div>

                  <table className="settings-table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((u, idx) => (
                        <tr key={u.email}>
                          <td>{u.name}</td>
                          <td>{u.email}</td>
                          <td>
                            <select value={u.role} onChange={(e) => setUserRole(idx, e.target.value)}>
                              <option>Administrator</option>
                              <option>Data Analyst</option>
                              <option>Viewer</option>
                            </select>
                          </td>
                          <td>
                            <Badge status={u.status} />
                          </td>
                          <td>
                            <button className="settings-link-btn" onClick={() => removeUser(idx)}>Remove</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <div className="settings-invite-row">
                    <input
                      placeholder="colleague@oceanobs.org"
                      value={inviteEmail}
                      onChange={(e) => setInviteEmail(e.target.value)}
                    />
                    <button className="settings-btn settings-btn-primary" onClick={inviteUser}>Invite user</button>
                  </div>
                </div>
              )}

              {/* ---------------- SECURITY ---------------- */}
              {activeTab === "Security" && (
                <>
                  <div className="settings-card settings-security-row">
                    <div>
                      <h2>Two-factor authentication</h2>
                      <p>Require a verification code in addition to your password.</p>
                    </div>
                    <Badge status="Enabled" />
                  </div>

                  <div className="settings-card">
                    <div className="settings-card-heading">
                      <h2>Session</h2>
                    </div>
                    <div className="settings-form-grid">
                      <label className="settings-field">
                        <span>Session timeout</span>
                        <select
                          value={security.sessionTimeout}
                          onChange={(e) => setSecurity((s) => ({ ...s, sessionTimeout: e.target.value }))}
                        >
                          <option>15 minutes</option>
                          <option>30 minutes</option>
                          <option>2 hours</option>
                        </select>
                      </label>
                    </div>
                    <div className="settings-toggle-row">
                      <div>
                        <div className="settings-toggle-title">Require re-authentication for sensitive actions</div>
                        <p>Deleting deployments, rotating API keys, and similar actions.</p>
                      </div>
                      <Toggle
                        checked={security.reauth}
                        onChange={() => setSecurity((s) => ({ ...s, reauth: !s.reauth }))}
                      />
                    </div>
                  </div>

                  

                  <div className="settings-card">
                    <div className="settings-card-heading">
                      <h2>Recent login activity</h2>
                    </div>
                    <ul className="settings-activity-list">
                      {loginActivity.map((a, i) => (
                        <li key={i}>
                          <span>{a.when}</span>
                          <span>{a.where}</span>
                          <span>{a.device}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              )}



              
            </div>
          </div>

          
        </div>
    
    
  );
}
