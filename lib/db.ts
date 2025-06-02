import mysql from "mysql2/promise"

// Database connection configuration
export async function createConnection() {
  try {
    return await mysql.createConnection({
      host: process.env.MYSQL_HOST || "localhost",
      user: process.env.MYSQL_USER || "root",
      password: process.env.MYSQL_PASSWORD || "",
      database: process.env.MYSQL_DATABASE || "refurbished_devices",
    })
  } catch (error) {
    console.error("Error connecting to MySQL database:", error)
    throw new Error("Failed to connect to database")
  }
}

// Atualize a função formatDate para usar o formato brasileiro (DD/MM/YYYY)
// Adicione esta função após a declaração de createConnection

function formatDateBR(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString("pt-BR")
}

// Function to fetch a device by ID
export async function getDeviceById(id: string) {
  const connection = await createConnection()

  try {
    // Fetch basic device information
    const [deviceRows] = await connection.execute("SELECT * FROM devices WHERE id = ?", [id])

    if (!Array.isArray(deviceRows) || deviceRows.length === 0) {
      return null
    }

    const device = deviceRows[0] as any

    // Fetch device specs
    const [specsRows] = await connection.execute("SELECT * FROM device_specs WHERE device_id = ?", [id])

    // Fetch device photos
    const [photoRows] = await connection.execute(
      "SELECT photo_url FROM device_photos WHERE device_id = ? ORDER BY display_order",
      [id],
    )

    // Fetch stress test results
    const [stressTestRows] = await connection.execute("SELECT * FROM stress_tests WHERE device_id = ?", [id])

    // Fetch data wipe information
    const [dataWipeRows] = await connection.execute("SELECT * FROM data_wipe WHERE device_id = ?", [id])

    // Format the data to match our component's expected structure
    const formattedDevice = {
      id: device.id,
      name: device.name,
      category: device.category,
      grade: device.grade,
      refurbishedDate: formatDateBR(device.refurbished_date),
      warranty: device.warranty,
      photos: photoRows ? (photoRows as any[]).map((row) => row.photo_url) : [],
      specs:
        specsRows && specsRows.length > 0
          ? {
              processor: (specsRows as any[])[0].processor,
              memory: (specsRows as any[])[0].memory,
              storage: (specsRows as any[])[0].storage,
              display: (specsRows as any[])[0].display,
              graphics: (specsRows as any[])[0].graphics,
              battery: (specsRows as any[])[0].battery,
              ports: (specsRows as any[])[0].ports,
              wireless: (specsRows as any[])[0].wireless,
              operatingSystem: (specsRows as any[])[0].operating_system,
              weight: (specsRows as any[])[0].weight,
            }
          : {},
      stressTests:
        stressTestRows && stressTestRows.length > 0
          ? {
              cpu: {
                score: (stressTestRows as any[])[0].cpu_score,
                temperature: (stressTestRows as any[])[0].cpu_temperature,
                throttling: (stressTestRows as any[])[0].cpu_throttling,
                stability: (stressTestRows as any[])[0].cpu_stability,
              },
              memory: {
                score: (stressTestRows as any[])[0].memory_score,
                errors: (stressTestRows as any[])[0].memory_errors,
                stability: (stressTestRows as any[])[0].memory_stability,
              },
              storage: {
                score: (stressTestRows as any[])[0].storage_score,
                readSpeed: (stressTestRows as any[])[0].storage_read_speed,
                writeSpeed: (stressTestRows as any[])[0].storage_write_speed,
                health: (stressTestRows as any[])[0].storage_health,
              },
              gpu: {
                score: (stressTestRows as any[])[0].gpu_score,
                temperature: (stressTestRows as any[])[0].gpu_temperature,
                stability: (stressTestRows as any[])[0].gpu_stability,
              },
              battery: {
                score: (stressTestRows as any[])[0].battery_score,
                capacity: (stressTestRows as any[])[0].battery_capacity,
                runtime: (stressTestRows as any[])[0].battery_runtime,
              },
            }
          : {},
      dataWipe:
        dataWipeRows && dataWipeRows.length > 0
          ? {
              method: (dataWipeRows as any[])[0].method,
              completionDate: formatDateBR((dataWipeRows as any[])[0].completion_date),
              verificationMethod: (dataWipeRows as any[])[0].verification_method,
              certificate: (dataWipeRows as any[])[0].certificate,
              technician: (dataWipeRows as any[])[0].technician,
            }
          : {},
    }

    return formattedDevice
  } catch (error) {
    console.error("Error fetching device data:", error)
    throw new Error("Failed to fetch device data")
  } finally {
    await connection.end()
  }
}

// Function to fetch all devices (for listing)
export async function getAllDevices() {
  const connection = await createConnection()

  try {
    const [rows] = await connection.execute(
      "SELECT id, name, category, grade, refurbished_date FROM devices ORDER BY refurbished_date DESC",
    )

    return rows
  } catch (error) {
    console.error("Error fetching devices:", error)
    throw new Error("Failed to fetch devices")
  } finally {
    await connection.end()
  }
}
