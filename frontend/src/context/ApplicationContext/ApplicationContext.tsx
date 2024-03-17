import {
  useContext,
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  PropsWithChildren,
  FC,
  useRef,
  MutableRefObject,
} from "react";

import { EPriority, IEvent } from "@type/event";

export interface IApplicationContext {
  isEditOpen: boolean;
  setIsEditOpen: Dispatch<SetStateAction<boolean>>;
  isCreateOpen: boolean;
  setIsCreateOpen: Dispatch<SetStateAction<boolean>>;
  isDeleteOpen: boolean;
  setIsDeleteOpen: Dispatch<SetStateAction<boolean>>;
  deleteLabel: MutableRefObject<string>;
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
  const [isCreateOpen, setIsCreateOpen] = useState<boolean>(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);
  const deleteLabel = useRef("");

  return (
    <ApplicationContext.Provider
      value={{
        isEditOpen,
        setIsEditOpen,
        isCreateOpen,
        setIsCreateOpen,
        editedEvent,
        setEditedEvent,
        isDeleteOpen,
        setIsDeleteOpen,
        deleteLabel,
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};

export default ApplicationContextProvider;
export const useApplicationContext = () =>
  useContext<IApplicationContext | null>(ApplicationContext);
