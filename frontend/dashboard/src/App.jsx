import { useEffect, useState } from 'react'
import { Modal } from 'flowbite'
import {
  Avatar,
  Button,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  createTheme,
  ThemeProvider,
} from 'flowbite-react'
import myAvatar from './assets/bild3.png'
import backgroundImage from './assets/nasa.jpg'


const customTheme = createTheme({
  button: {
    color: {
      primary: "bg-red-500 hover:bg-red-600",
      secondary: "bg-blue-500 hover:bg-blue-600",
    },
    size: {
      lg: "px-6 py-3 text-lg",
    },
  },
});

export default function App() {
  const [data, setData] = useState(null)
  const [cases, setCases] = useState([])
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [type, setType] = useState('Brand')
  const [description, setDescription] = useState('')
  const [submitError, setSubmitError] = useState('')
  const [logs, setLogs] = useState([])

  useEffect(() => {
    fetch('http://127.0.0.1:8000/')
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error('API error:', err))
  }, [])

  const fetchCases = () => {
    fetch('http://127.0.0.1:8000/cases')
      .then((res) => res.json())
      .then((json) => setCases(json))
      .catch((err) => console.error('Cases error:', err))
  }

  useEffect(() => {
    fetchCases()
  }, [])

  useEffect(() => {
    const modalElement = document.querySelector('#modalEl')
    if (!modalElement) return

    const modal = new Modal(modalElement, {
      placement: 'bottom-right',
      backdrop: 'dynamic',
      backdropClasses: 'bg-gray-900/50 fixed inset-0 z-40',
      onHide: () => {
        console.log('modal is hidden')
      },
      onShow: () => {
        console.log('modal is shown')
      },
    })

    modal.show()
    return () => modal.hide()
  }, [])

  useEffect(() => {
  fetch('http://127.0.0.1:8000/logs/case/1')  // byt 1 mot rätt case_id
    .then(res => res.json())
    .then(json => setLogs(json))
    .catch(err => console.error('Logs error:', err))
}, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const payload = { name, phone, type, description }

    const res = await fetch('http://127.0.0.1:8000/cases', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    const responseData = await res.json()
    console.log('Backend svar:', responseData)

    if (res.ok) {
      setName('')
      setPhone('')
      setType('Brand')
      setDescription('')

      setSubmitError('')
      setCases((prev) => [responseData, ...prev])
      fetchCases()
    } else {
      setSubmitError(
        typeof responseData?.detail === 'string'
          ? responseData.detail
          : 'Kunde inte spara ärendet.'
      )
    }
  }


  return (
    <ThemeProvider theme={customTheme}>
      <div className="group relative min-h-screen bg-gray-50">
        <div className="absolute inset-0 overflow-hidden backdrop-blur-md">
          <img
            src={backgroundImage}
            alt="Background"
            className="h-full w-full object-cover blur-sm group-hover:blur-none transition-all duration-300"
          />
        </div>
        <div className="relative z-10 flex min-h-screen items-center justify-center p-6">
        <div className="w-full max-w-md bg-light-pink shadow-lg rounded-xl p-8 space-y-6">
          <div className="flex flex-wrap gap-2">
            <Avatar img={myAvatar} alt="Min avatar" rounded bordered status="online" statusColor="pink" size="xl" />
            <div className="space-y-1 font-medium dark:text-pink">
              <div>Hereng Issa</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Joined in August 2014</div>
            </div>
            <Dropdown
              label={<Avatar alt="User settings" img={myAvatar} rounded />}
              arrowIcon={false}
              inline
            >
              <DropdownHeader>
                <span className="block text-sm text-pink-1000 dark:text-gray-800 dark:text-gray-400     dark:text-gray-800">Hereng Issa</span>
                <span className="block truncate text-sm font-medium text-gray-400 dark:text-gray-400">hereng.issa@gmail.com</span>
              </DropdownHeader>
              <DropdownItem href="/profile">Profile</DropdownItem>
              <DropdownItem href="/settings">Settings</DropdownItem>
              <DropdownDivider />
              <DropdownItem href="/logout">Logout</DropdownItem>
            </Dropdown>
          </div>

        <h1 className="text-2xl font-semibold text-gray-400">
          Skapa nytt ärende nedanför
        </h1>

        <form className="space-y-5" onSubmit={handleSubmit}>

          {/* Namn */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Namn
            </label>
            <input
              type="text"
              placeholder="Ange namn"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-150 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Telefonnummer */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Telefonnummer
            </label>
            <input
              type="tel"
              placeholder="070-123 45 67"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Ärendetyp */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Ärendetyp
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>Brand</option>
              <option>Sjukvård</option>
              <option>Polis</option>
              <option>Tekniskt fel</option>
            </select>
          </div>

          {/* Beskrivning */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Beskrivning
            </label>
            <textarea
              rows="4"
              placeholder="Beskriv situationen..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          {/* Skicka-knapp */}
          <Button
            type="submit"
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:bg-gradient-to-l focus:ring-purple-200 dark:focus:ring-purple-800"
          >
            Skicka ärende
          </Button>
          {submitError ? (
            <p className="text-sm text-red-600">{submitError}</p>
          ) : null}


        </form>

        <div className="rounded-lg bg-white/80 p-3 text-sm">
          {data ? (
            <pre className="whitespace-pre-wrap">{JSON.stringify(data, null, 2)}</pre>
          ) : (
            <p>Laddar data...</p>
          )}
        </div>

        <div className="rounded-lg bg-white/80 p-3 text-sm">
          <div className="mb-2 font-semibold text-gray-700">Ärenden</div>
          {cases.length > 0 ? (
            <div className="space-y-2">
              {cases.map((item) => (
                <div key={item.id} className="rounded-md border border-gray-200 bg-white/70 p-2">
                  <div className="font-medium">{item.name}</div>
                  <div className="text-xs text-gray-600">{item.phone} • {item.type}</div>
                  <div className="text-sm text-gray-700">{item.description}</div>
                </div>
              ))}
            </div>
          ) : (
            <p>Inga ärenden ännu.</p>
          )}
        </div>

        <div className="rounded-lg bg-white/80 p-3 text-sm">
          <div className="mb-2 font-semibold text-gray-700">Loggar</div>
          {logs.length > 0 ? (
            logs.map((log) => (
              <div key={log.id} className="border-b py-2">
                <p className="text-sm">{log.message}</p>
                <p className="text-xs text-gray-500">
                  {new Date(log.timestamp).toLocaleString()}
                </p>
              </div>
            ))
          ) : (
            <p>Inga loggar ännu.</p>
          )}
        </div>
      </div>
      </div>
        <div
          id="modalEl"
          tabIndex="-1"
          aria-hidden="true"
          className="hidden fixed inset-0 z-50 flex items-center justify-center"
        >
          <div className="relative w-full max-w-md p-4">
            <div className="relative rounded-lg bg-white shadow">
              <div className="flex items-center justify-between border-b p-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Flowbite modal
                </h3>
                <button
                  type="button"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-900"
                  data-modal-hide="modalEl"
                  aria-label="Close"
                >
                  <span className="sr-only">Close modal</span>
                  ×
                </button>
              </div>
              <div className="p-4 text-gray-600">
                Det här är ett exempel på en Flowbite-modal.
              </div>
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  )
}
