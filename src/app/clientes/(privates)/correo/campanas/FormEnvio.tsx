"use client";

import Input from "@/app/clientes/components/form/Input";
import { IContacto } from "@/interfaces/contactos.interfaces";
import { IListaContacto } from "@/interfaces/listaContactos.interfaces";
import React, { FormEvent } from "react";
import Destinatarios from "./Destinatarios";
import Button from "@/app/clientes/components/Button";
import Textarea from "@/app/clientes/components/form/Textarea";
import ErrorMessage from "@/app/clientes/components/ErrorMessage";
import BodyEditor from "@/app/clientes/components/BodyEditor";
import { sanitize } from "dompurify";
import { marked } from "marked";
import useFetch from "@/app/hooks/useFetch";
import { ICreateCampania } from "@/interfaces/campania.interfaces";

interface IFormEnvioProps {
   contactos: IContacto[];
   listas: IListaContacto[];
}

interface IFormCampania {
   asunto: string;
   nombreRemitente: string;
   correoRemitente: string;
   cuerpo: string;
   contactos: Array<number>;
   lista_contactos: Array<number>;
}

function FormEnvio({ contactos, listas }: IFormEnvioProps) {
   const [form, setForm] = React.useState<IFormCampania>({
      asunto: "",
      nombreRemitente: "",
      correoRemitente: "",
      cuerpo: "",
   });
   const [formError, setFormError] = React.useState<string>("");
   const [contactsSelection, setContactsSelection] = React.useState<number[]>(
      []
   );
   const [listsSelection, setListsSelection] = React.useState<number[]>([]);
   const { loading, fetchCS } = useFetch();
   const { asunto, nombreRemitente, correoRemitente, cuerpo } = form;

   const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
   ) => {
      setForm({
         ...form,
         [e.target.name]: e.target.value,
      });
   };
   const handleCuerpo = (markdown: string) => {
      setForm((prevForm) => ({ ...prevForm, cuerpo: markdown }));
   };
   // const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
   const handleSubmit = async () => {
      setFormError("");
      console.log(form);
      if (
         asunto.trim() === "" ||
         nombreRemitente.trim() === "" ||
         correoRemitente.trim() === "" ||
         cuerpo.trim() === ""
      ) {
         setFormError("*Todos los campos son obligatorios");
         return;
      }

      if (contactsSelection.length === 0 && listsSelection.length === 0) {
         setFormError("Debe seleccionar al menos un destinatario");
         return;
      }

      const dataToSend: ICreateCampania = {
         ...form,
         correoRemitente: form. correoRemitente + '@gmail.com',
         cuerpo: sanitize(marked.parse(form.cuerpo)),
         contactos: contactsSelection,
         lista_contactos: listsSelection,
      }
      console.log(dataToSend)

      const res = await fetchCS({
         url: "/campanas",
         method: "POST",
         data: dataToSend,
      });
      console.log(res);
   };

   return (
      <form className="mt-5">
         <h3 className="text-lg">Información</h3>
         <Input
            label="Asunto"
            classContainer="my-4"
            value={asunto}
            name="asunto"
            onChange={handleChange}
         />
         <Input
            label="Nombre Remitente"
            classContainer="my-4"
            value={nombreRemitente}
            name="nombreRemitente"
            onChange={handleChange}
         />

         <h3 className="text-lg mb-5">Correos</h3>
         <div className="grid grid-cols-3 items-center">
            <div className="col-span-2 grid grid-cols-2 items-center">
               <Input
                  label="Correo electrónico remitente"
                  name="correoRemitente"
                  classContainer=""
                  value={correoRemitente}
                  onChange={handleChange}
               />
               <p className="t translate-y-3 ml-2">@dominio.com</p>
            </div>
         </div>

         <h3 className="text-lg my-5">Destinatarios</h3>
         <Destinatarios
            contactos={contactos}
            listas={listas}
            contactsSelection={contactsSelection}
            setContactsSelection={setContactsSelection}
            listsSelection={listsSelection}
            setListsSelection={setListsSelection}
         />

         <h3 className="text-lg my-5">Correo</h3>

         <BodyEditor handleBody={handleCuerpo} />

         <ErrorMessage error={formError} className="mb-5 text-base" />

         <Button
            type="button"
            label="Realizar la campaña"
            className="w-full"
            onClick={() => handleSubmit()}
         />
      </form>
   );
}

export default FormEnvio;
