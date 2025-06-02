"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Check, Cpu, HardDrive, Laptop, Monitor, Shield, Thermometer, Printer, Loader2 } from "lucide-react"
import Image from "next/image"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Define the device data type
interface DeviceData {
  id: string
  name: string
  category: string
  grade: string
  refurbishedDate: string
  warranty: string
  photos: string[]
  specs: {
    processor: string
    memory: string
    storage: string
    display: string
    graphics: string
    battery: string
    ports: string
    wireless: string
    operatingSystem: string
    weight: string
  }
  stressTests: {
    cpu: {
      score: number
      temperature: string
      throttling: string
      stability: string
    }
    memory: {
      score: number
      errors: string
      stability: string
    }
    storage: {
      score: number
      readSpeed: string
      writeSpeed: string
      health: string
    }
    gpu: {
      score: number
      temperature: string
      stability: string
    }
    battery: {
      score: number
      capacity: string
      runtime: string
    }
  }
  dataWipe: {
    method: string
    completionDate: string
    verificationMethod: string
    certificate: string
    technician: string
  }
}

// Default device ID - in a real app, this would come from URL params or props
const DEFAULT_DEVICE_ID = "RF-2023-05421"

export default function RefurbishedReport({ deviceId = DEFAULT_DEVICE_ID }) {
  const [deviceData, setDeviceData] = useState<DeviceData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchDeviceData() {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch(`/api/devices/${deviceId}`)

        if (!response.ok) {
          throw new Error(`Failed to fetch device data: ${response.statusText}`)
        }

        const data = await response.json()
        setDeviceData(data)
      } catch (err) {
        console.error("Error fetching device data:", err)
        setError("Failed to load device data. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchDeviceData()
  }, [deviceId])

  // Vamos atualizar o componente RefurbishedReport para português brasileiro
  // Manteremos a estrutura, mas traduziremos todos os textos

  // Atualize a função printReport para:
  const printReport = () => {
    window.print()
  }

  // Show loading state
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
        <p>Carregando dados do dispositivo...</p>
      </div>
    )
  }

  // Show error state
  if (error || !deviceData) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Erro</AlertTitle>
        <AlertDescription>
          {error || "Falha ao carregar dados do dispositivo. Por favor, tente novamente mais tarde."}
        </AlertDescription>
      </Alert>
    )
  }

  // Substitua o conteúdo do return com o seguinte:
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Relatório de Equipamento Recondicionado</h2>
        <Button onClick={printReport} className="print:hidden">
          <Printer className="mr-2 h-4 w-4" />
          Imprimir Relatório
        </Button>
      </div>
      <div className="flex flex-col md:flex-row gap-4 items-start">
        <div className="flex-1">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-2xl">{deviceData.name}</CardTitle>
                  <CardDescription>ID: {deviceData.id}</CardDescription>
                </div>
                <Badge className="bg-green-600 hover:bg-green-700">Grau {deviceData.grade}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Categoria</p>
                  <p className="text-sm">{deviceData.category}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Data de Recondicionamento</p>
                  <p className="text-sm">{deviceData.refurbishedDate}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Garantia</p>
                  <p className="text-sm">{deviceData.warranty}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Condição Geral</p>
                  <div className="flex items-center">
                    <Progress value={92} className="h-2 w-24" />
                    <span className="ml-2 text-sm">92%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Hardware Specs Card */}
      <Card>
        <CardHeader>
          <CardTitle>Especificações de Hardware</CardTitle>
          <CardDescription>Especificações técnicas do {deviceData.name}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start space-x-3">
                <Cpu className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <h4 className="font-medium">Processador</h4>
                  <p className="text-sm text-muted-foreground">{deviceData.specs.processor}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <HardDrive className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <h4 className="font-medium">Memória</h4>
                  <p className="text-sm text-muted-foreground">{deviceData.specs.memory}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <HardDrive className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <h4 className="font-medium">Armazenamento</h4>
                  <p className="text-sm text-muted-foreground">{deviceData.specs.storage}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Monitor className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <h4 className="font-medium">Tela</h4>
                  <p className="text-sm text-muted-foreground">{deviceData.specs.display}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Laptop className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <h4 className="font-medium">Placa de Vídeo</h4>
                  <p className="text-sm text-muted-foreground">{deviceData.specs.graphics}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Laptop className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <h4 className="font-medium">Sistema Operacional</h4>
                  <p className="text-sm text-muted-foreground">{deviceData.specs.operatingSystem}</p>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h4 className="font-medium mb-2">Especificações Adicionais</h4>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Bateria</TableCell>
                    <TableCell>{deviceData.specs.battery}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Portas</TableCell>
                    <TableCell>{deviceData.specs.ports}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Conectividade</TableCell>
                    <TableCell>{deviceData.specs.wireless}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Peso</TableCell>
                    <TableCell>{deviceData.specs.weight}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="photos" className="w-full">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="photos">Fotos</TabsTrigger>
          <TabsTrigger value="stress-tests">Testes de Estresse</TabsTrigger>
          <TabsTrigger value="data-wipe">Limpeza de Dados</TabsTrigger>
        </TabsList>

        <TabsContent value="photos" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Fotos do Dispositivo</CardTitle>
              <CardDescription>Inspeção visual do {deviceData.name} recondicionado</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[0, 1, 2, 3, 4, 5].map((index) => (
                  <div key={index} className="relative aspect-video rounded-md overflow-hidden border">
                    <Image
                      src={deviceData.photos[index] || "/placeholder.svg?height=400&width=600"}
                      alt={`Foto ${index + 1} do ${deviceData.name}`}
                      fill
                      className="object-cover"
                    />
                    {!deviceData.photos[index] && (
                      <div className="absolute inset-0 flex items-center justify-center bg-muted/10">
                        <p className="text-sm text-muted-foreground">Sem foto</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stress-tests" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Testes de Desempenho</CardTitle>
              <CardDescription>Resultados de testes abrangentes em todos os componentes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Cpu className="h-5 w-5 text-muted-foreground" />
                      <h4 className="font-medium">Desempenho da CPU</h4>
                    </div>
                    <Badge variant="outline" className="ml-auto">
                      Pontuação: {deviceData.stressTests.cpu.score}/100
                    </Badge>
                  </div>
                  <Progress value={deviceData.stressTests.cpu.score} className="h-2" />
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <Thermometer className="h-4 w-4 text-muted-foreground" />
                      <span>{deviceData.stressTests.cpu.temperature}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span>
                        {deviceData.stressTests.cpu.throttling === "None detected"
                          ? "Nenhum detectado"
                          : deviceData.stressTests.cpu.throttling}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span>{deviceData.stressTests.cpu.stability}</span>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <HardDrive className="h-5 w-5 text-muted-foreground" />
                      <h4 className="font-medium">Teste de Memória</h4>
                    </div>
                    <Badge variant="outline" className="ml-auto">
                      Pontuação: {deviceData.stressTests.memory.score}/100
                    </Badge>
                  </div>
                  <Progress value={deviceData.stressTests.memory.score} className="h-2" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span>
                        {deviceData.stressTests.memory.errors === "0 errors detected"
                          ? "0 erros detectados"
                          : deviceData.stressTests.memory.errors}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span>{deviceData.stressTests.memory.stability}</span>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <HardDrive className="h-5 w-5 text-muted-foreground" />
                      <h4 className="font-medium">Desempenho de Armazenamento</h4>
                    </div>
                    <Badge variant="outline" className="ml-auto">
                      Pontuação: {deviceData.stressTests.storage.score}/100
                    </Badge>
                  </div>
                  <Progress value={deviceData.stressTests.storage.score} className="h-2" />
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">Leitura:</span>
                      <span>{deviceData.stressTests.storage.readSpeed}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">Escrita:</span>
                      <span>{deviceData.stressTests.storage.writeSpeed}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">Saúde:</span>
                      <span>{deviceData.stressTests.storage.health}</span>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Laptop className="h-5 w-5 text-muted-foreground" />
                      <h4 className="font-medium">Desempenho da GPU</h4>
                    </div>
                    <Badge variant="outline" className="ml-auto">
                      Pontuação: {deviceData.stressTests.gpu.score}/100
                    </Badge>
                  </div>
                  <Progress value={deviceData.stressTests.gpu.score} className="h-2" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <Thermometer className="h-4 w-4 text-muted-foreground" />
                      <span>{deviceData.stressTests.gpu.temperature}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span>{deviceData.stressTests.gpu.stability}</span>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Laptop className="h-5 w-5 text-muted-foreground" />
                      <h4 className="font-medium">Saúde da Bateria</h4>
                    </div>
                    <Badge variant="outline" className="ml-auto">
                      Pontuação: {deviceData.stressTests.battery.score}/100
                    </Badge>
                  </div>
                  <Progress value={deviceData.stressTests.battery.score} className="h-2" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">Capacidade:</span>
                      <span>{deviceData.stressTests.battery.capacity}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">Autonomia:</span>
                      <span>
                        {deviceData.stressTests.battery.runtime
                          .replace("Approximately", "Aproximadamente")
                          .replace("hours", "horas")
                          .replace("under normal use", "em uso normal")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="data-wipe" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Certificado de Limpeza de Dados</CardTitle>
              <CardDescription>Verificação de exclusão completa de dados</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex justify-center mb-4">
                  <div className="inline-flex items-center justify-center p-8 rounded-full bg-green-50 border-2 border-green-200">
                    <Shield className="h-16 w-16 text-green-500" />
                  </div>
                </div>

                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold">Limpeza de Dados Certificada</h3>
                  <p className="text-muted-foreground">
                    Este dispositivo foi limpo com segurança de acordo com os padrões da indústria
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Método de Limpeza</p>
                    <p className="text-sm">{deviceData.dataWipe.method}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Data de Conclusão</p>
                    <p className="text-sm">{deviceData.dataWipe.completionDate}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Método de Verificação</p>
                    <p className="text-sm">
                      {deviceData.dataWipe.verificationMethod === "Bit-by-bit verification"
                        ? "Verificação bit a bit"
                        : deviceData.dataWipe.verificationMethod}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">ID do Certificado</p>
                    <p className="text-sm">{deviceData.dataWipe.certificate}</p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <p className="text-sm font-medium">Informações do Técnico</p>
                  <div className="flex items-center space-x-2">
                    <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center">
                      <span className="text-sm font-medium">JS</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">{deviceData.dataWipe.technician}</p>
                      <p className="text-xs text-muted-foreground">Especialista Certificado em Destruição de Dados</p>
                    </div>
                  </div>
                </div>

                <div className="border rounded-md p-4 bg-muted/20">
                  <p className="text-sm text-center">
                    Esta certificação confirma que todos os dados do usuário foram permanentemente e seguramente
                    apagados deste dispositivo de acordo com os padrões da indústria. O dispositivo está agora pronto
                    para reutilização sem risco de recuperação de dados.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <style jsx global>{`
        @media print {
          body {
            background: white;
          }
          .container {
            max-width: 100% !important;
          }
          .card {
            break-inside: avoid;
          }
          .tabs-content {
            display: block !important;
          }
          .tabs-list {
            display: none !important;
          }
        }
      `}</style>
    </div>
  )
}
