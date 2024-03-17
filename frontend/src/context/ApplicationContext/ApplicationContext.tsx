import {
  useContext,
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  PropsWithChildren,
  FC,
} from "react";

import { EPriority, IEvent } from "@type/event";

export interface IApplicationContext {
  isEditOpen: boolean;
  setIsEditOpen: Dispatch<SetStateAction<boolean>>;
  editedEvent: IEvent;
  setEditedEvent: Dispatch<SetStateAction<IEvent>>;
}

const ApplicationContext = createContext<IApplicationContext | null>(null);

const ApplicationContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [editedEvent, setEditedEvent] = useState<IEvent>({
    id: -1,
    title: "",
    description: "",
    endTime: "",
    startTime: "",
    priority: EPriority.low,
  });
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);

  return (
    <ApplicationContext.Provider
      value={{
        isEditOpen,
        setIsEditOpen,
        editedEvent,
        setEditedEvent,
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};

export default ApplicationContextProvider;
export const useApplicationContext = () =>
  useContext<IApplicationContext | null>(ApplicationContext);
