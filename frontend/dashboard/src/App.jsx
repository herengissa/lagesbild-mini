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

  useEffect(() => {
    fetch('http://127.0.0.1:8000/')
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error('API error:', err))
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

        <form className="space-y-5">

          {/* Namn */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Namn
            </label>
            <input
              type="text"
              placeholder="Ange namn"
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
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Ärendetyp */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Ärendetyp
            </label>
            <select
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
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          {/* Skicka-knapp */}
          <Button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:bg-gradient-to-l focus:ring-purple-200 dark:focus:ring-purple-800">
            Skicka ärende
          </Button>

          <div className="flex flex-wrap items-start gap-2">
            <Button type="button" size="lg">Extra large</Button>
          </div>

        </form>

        <div className="rounded-lg bg-white/80 p-3 text-sm">
          {data ? (
            <pre className="whitespace-pre-wrap">{JSON.stringify(data, null, 2)}</pre>
          ) : (
            <p>Laddar data...</p>
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
