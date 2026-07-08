import React, { useState, useMemo } from 'react';
import { Calendar as CalendarIcon, Gift } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

// Event calculation helpers
function getEaster(year: number) {
  const f = Math.floor,
    G = year % 19,
    C = f(year / 100),
    H = (C - f(C / 4) - f((8 * C + 13) / 25) + 19 * G + 15) % 30,
    I = H - f(H / 28) * (1 - f(29 / (H + 1)) * f((21 - G) / 11)),
    J = (year + f(year / 4) + I + 2 - C + f(C / 4)) % 7,
    L = I - J,
    month = 3 + f((L + 40) / 44),
    day = L + 28 - 31 * f(month / 4);
  return new Date(year, month - 1, day);
}

function getDiaDasMaes(year: number) {
  const date = new Date(year, 4, 1);
  while (date.getDay() !== 0) {
    date.setDate(date.getDate() + 1);
  }
  date.setDate(date.getDate() + 7);
  return date;
}

function getDiaDosPais(year: number) {
  const date = new Date(year, 7, 1);
  while (date.getDay() !== 0) {
    date.setDate(date.getDate() + 1);
  }
  date.setDate(date.getDate() + 7);
  return date;
}

function getBlackFriday(year: number) {
  const date = new Date(year, 10, 1);
  while (date.getDay() !== 4) {
    date.setDate(date.getDate() + 1);
  }
  date.setDate(date.getDate() + 21 + 1);
  return date;
}

export interface RetailEvent {
  name: string;
  date: Date;
  categories: string[];
  colorClass: string;
}

interface BotaoCalendarioProps {
  activeEvent: string | null;
  onSelectEvent: (eventName: string | null) => void;
  disabled?: boolean;
}

export default function BotaoCalendario({ activeEvent, onSelectEvent, disabled }: BotaoCalendarioProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  // Dynamic calculations for retail events
  const currentYear = new Date().getFullYear();
  
  const retailEvents = useMemo<RetailEvent[]>(() => {
    return [
      {
        name: "Páscoa",
        date: getEaster(currentYear),
        categories: ["Chocolate", "Vinhos de Sobremesa", "Ovos"],
        colorClass: "bg-yellow-500/20 text-yellow-700 hover:bg-yellow-500/30 border-yellow-300",
      },
      {
        name: "Dia das Mães",
        date: getDiaDasMaes(currentYear),
        categories: ["Chocolate", "Cereais", "Nescafé"],
        colorClass: "bg-pink-500/20 text-pink-700 hover:bg-pink-500/30 border-pink-300",
      },
      {
        name: "Dia dos Namorados",
        date: new Date(currentYear, 5, 12), // June 12
        categories: ["Vinhos", "Espumantes", "Chocolate"],
        colorClass: "bg-red-500/20 text-red-700 hover:bg-red-500/30 border-red-300",
      },
      {
        name: "Dia dos Pais",
        date: getDiaDosPais(currentYear),
        categories: ["Whisky", "Cachaça", "Gin"],
        colorClass: "bg-blue-500/20 text-blue-700 hover:bg-blue-500/30 border-blue-300",
      },
      {
        name: "Black Friday",
        date: getBlackFriday(currentYear),
        categories: ["Todos", "Ofertas Prioritárias"],
        colorClass: "bg-neutral-800/20 text-neutral-800 hover:bg-neutral-800/30 border-neutral-400",
      },
      {
        name: "Natal",
        date: new Date(currentYear, 11, 25), // December 25
        categories: ["Panettone", "Vinhos", "Espumantes", "Todos"],
        colorClass: "bg-green-500/20 text-green-700 hover:bg-green-500/30 border-green-300",
      }
    ];
  }, [currentYear]);

  // Create lookup map of formatted event dates (DD-MM-YYYY)
  const eventDateLookup = useMemo(() => {
    const map = new Map<string, RetailEvent>();
    retailEvents.forEach(e => {
      const key = `${e.date.getDate()}-${e.date.getMonth()}-${e.date.getFullYear()}`;
      map.set(key, e);
    });
    return map;
  }, [retailEvents]);

  // Modifiers for react-day-picker
  const modifiers = useMemo(() => {
    return {
      retailEvent: retailEvents.map(e => e.date)
    };
  }, [retailEvents]);

  const handleSelectDay = (date: Date | undefined) => {
    setSelectedDate(date);
    if (!date) return;

    const key = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
    const matchingEvent = eventDateLookup.get(key);

    if (matchingEvent) {
      onSelectEvent(matchingEvent.name);
      setIsOpen(false);
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={cn(
            "relative z-10 flex items-center justify-center gap-2 rounded-xl border-[2.5px] px-5 py-2 h-11 font-black transition-all duration-150 active:scale-95 select-none w-full md:w-auto shadow-sm",
            activeEvent
              ? "bg-[#EA0086] border-[#222222] text-white hover:bg-[#c90074]"
              : "bg-white border-[#E2E8F0] text-slate-700 hover:bg-slate-50 hover:border-slate-300"
          )}
          disabled={disabled}
        >
          <CalendarIcon className="h-[18px] w-[18px] shrink-0" strokeWidth={2.5} />
          <span className="tracking-wide text-xs uppercase">
            {activeEvent ? activeEvent : "Calendário Sazonal"}
          </span>
        </button>
      </PopoverTrigger>

      <PopoverContent className="w-80 p-4 rounded-2xl shadow-xl border-slate-100 bg-white z-50">
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b pb-2">
            <Gift className="h-4 w-4 text-[#EA0086]" />
            <h4 className="font-extrabold text-sm uppercase tracking-wider text-slate-800">
              Calendário Comercial
            </h4>
          </div>

          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={handleSelectDay}
            className="rounded-xl border border-slate-50 p-2 shadow-inner"
            modifiers={modifiers}
            modifiersClassNames={{
              retailEvent: "border-2 border-[#EA0086] text-[#EA0086] font-extrabold rounded-full bg-[#EA0086]/5 hover:bg-[#EA0086]/20 transition-all shadow-[0_0_8px_rgba(234,0,134,0.15)]"
            }}
          />

          <div className="space-y-2 border-t pt-3">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
              Próximos Eventos do Mix
            </span>
            <div className="grid grid-cols-2 gap-1.5 max-h-36 overflow-y-auto">
              {retailEvents.map((event) => (
                <button
                  key={event.name}
                  type="button"
                  onClick={() => {
                    onSelectEvent(event.name);
                    setIsOpen(false);
                  }}
                  className={cn(
                    "flex flex-col items-start p-2 text-left rounded-lg border text-xs transition-all",
                    event.colorClass,
                    activeEvent === event.name ? "ring-2 ring-[#EA0086]" : ""
                  )}
                >
                  <span className="font-extrabold block truncate w-full">{event.name}</span>
                  <span className="text-[9px] opacity-75">
                    {event.date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
