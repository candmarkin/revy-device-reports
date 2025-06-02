-- Database schema for refurbished devices

-- Create database
CREATE DATABASE IF NOT EXISTS refurbished_devices;
USE refurbished_devices;

-- Devices table
CREATE TABLE IF NOT EXISTS devices (
  id VARCHAR(20) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  category VARCHAR(50) NOT NULL,
  grade CHAR(1) NOT NULL,
  refurbished_date DATE NOT NULL,
  warranty VARCHAR(50) NOT NULL
);

-- Device specifications
CREATE TABLE IF NOT EXISTS device_specs (
  device_id VARCHAR(20) PRIMARY KEY,
  processor VARCHAR(255) NOT NULL,
  memory VARCHAR(100) NOT NULL,
  storage VARCHAR(100) NOT NULL,
  display VARCHAR  NOT NULL,
  memory VARCHAR(100) NOT NULL,
  storage VARCHAR(100) NOT NULL,
  display VARCHAR(255) NOT NULL,
  graphics VARCHAR(255) NOT NULL,
  battery VARCHAR(255) NOT NULL,
  ports TEXT NOT NULL,
  wireless VARCHAR(255) NOT NULL,
  operating_system VARCHAR(100) NOT NULL,
  weight VARCHAR(50) NOT NULL,
  FOREIGN KEY (device_id) REFERENCES devices(id) ON DELETE CASCADE
);

-- Device photos
CREATE TABLE IF NOT EXISTS device_photos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  device_id VARCHAR(20) NOT NULL,
  photo_url VARCHAR(255) NOT NULL,
  display_order INT NOT NULL,
  FOREIGN KEY (device_id) REFERENCES devices(id) ON DELETE CASCADE
);

-- Stress test results
CREATE TABLE IF NOT EXISTS stress_tests (
  device_id VARCHAR(20) PRIMARY KEY,
  cpu_score INT NOT NULL,
  cpu_temperature VARCHAR(50) NOT NULL,
  cpu_throttling VARCHAR(100) NOT NULL,
  cpu_stability VARCHAR(255) NOT NULL,
  memory_score INT NOT NULL,
  memory_errors VARCHAR(50) NOT NULL,
  memory_stability VARCHAR(255) NOT NULL,
  storage_score INT NOT NULL,
  storage_read_speed VARCHAR(50) NOT NULL,
  storage_write_speed VARCHAR(50) NOT NULL,
  storage_health VARCHAR(20) NOT NULL,
  gpu_score INT NOT NULL,
  gpu_temperature VARCHAR(50) NOT NULL,
  gpu_stability VARCHAR(255) NOT NULL,
  battery_score INT NOT NULL,
  battery_capacity VARCHAR(50) NOT NULL,
  battery_runtime VARCHAR(100) NOT NULL,
  FOREIGN KEY (device_id) REFERENCES devices(id) ON DELETE CASCADE
);

-- Data wipe information
CREATE TABLE IF NOT EXISTS data_wipe (
  device_id VARCHAR(20) PRIMARY KEY,
  method VARCHAR(100) NOT NULL,
  completion_date DATE NOT NULL,
  verification_method VARCHAR(100) NOT NULL,
  certificate VARCHAR(50) NOT NULL,
  technician VARCHAR(100) NOT NULL,
  FOREIGN KEY (device_id) REFERENCES devices(id) ON DELETE CASCADE
);

-- Insert sample data
INSERT INTO devices (id, name, category, grade, refurbished_date, warranty)
VALUES ('RF-2023-05421', 'Dell XPS 15 9570', 'Laptop', 'A', '2023-10-15', '12 months');

INSERT INTO device_specs (device_id, processor, memory, storage, display, graphics, battery, ports, wireless, operating_system, weight)
VALUES (
  'RF-2023-05421',
  'Intel Core i7-8750H (6 cores, 12 threads, 2.2GHz base, 4.1GHz boost)',
  '16GB DDR4 2666MHz (2x8GB)',
  '512GB NVMe SSD',
  '15.6" 4K UHD (3840x2160) InfinityEdge Touch Display',
  'NVIDIA GeForce GTX 1050Ti 4GB GDDR5',
  '97Whr, 6-Cell Battery (Integrated)',
  '2x USB 3.1 Gen 1, 1x USB-C with Thunderbolt 3, HDMI 2.0, SD card reader, 3.5mm headphone jack',
  'Killer 1535 802.11ac 2x2 WiFi and Bluetooth 4.2',
  'Windows 11 Pro',
  '4.5 lbs (2.04 kg)'
);

INSERT INTO device_photos (device_id, photo_url, display_order)
VALUES 
  ('RF-2023-05421', '/placeholder.svg?height=400&width=600', 1),
  ('RF-2023-05421', '/placeholder.svg?height=400&width=600', 2),
  ('RF-2023-05421', '/placeholder.svg?height=400&width=600', 3);

INSERT INTO stress_tests (
  device_id, 
  cpu_score, cpu_temperature, cpu_throttling, cpu_stability,
  memory_score, memory_errors, memory_stability,
  storage_score, storage_read_speed, storage_write_speed, storage_health,
  gpu_score, gpu_temperature, gpu_stability,
  battery_score, battery_capacity, battery_runtime
)
VALUES (
  'RF-2023-05421',
  92, '75°C max under load', 'None detected', 'Stable under 100% load for 1 hour',
  98, '0 errors detected', 'Passed 4 cycles of MemTest86',
  95, '2,850 MB/s', '1,920 MB/s', '98%',
  90, '78°C max under load', 'Stable under FurMark stress test for 30 minutes',
  88, '92% of original capacity', 'Approximately 6.5 hours under normal use'
);

INSERT INTO data_wipe (device_id, method, completion_date, verification_method, certificate, technician)
VALUES (
  'RF-2023-05421',
  'DoD 5220.22-M (3 passes)',
  '2023-10-12',
  'Bit-by-bit verification',
  'DW-2023-05421',
  'John Smith'
);
