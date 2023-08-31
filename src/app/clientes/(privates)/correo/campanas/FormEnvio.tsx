"use client";

import Input from "@/app/clientes/components/form/Input";
import { IContacto } from "@/interfaces/contactos.interfaces";
import { IListaContacto } from "@/interfaces/listaContactos.interfaces";
import React, { FormEvent, useState } from "react";
import Destinatarios from "./Destinatarios";
import Button from "@/app/clientes/components/Button";
import Textarea from "@/app/clientes/components/form/Textarea";
import ErrorMessage from "@/app/clientes/components/ErrorMessage";
import BodyEditor from "@/app/clientes/components/BodyEditor";
import { sanitize } from "dompurify";
import { marked } from "marked";
import useFetch from "@/app/hooks/useFetch";
import { ICreateCampania } from "@/interfaces/campania.interfaces";
import Modal from "@/app/clientes/components/Modal";
import { IUserMe } from "@/interfaces/auth.interfaces";

interface IFormEnvioProps {
   contactos: IContacto[];
   listas: IListaContacto[];
   user: IUserMe;
}

interface IFormCampania {
   asunto: string;
   nombreRemitente: string;
   correoRemitente: string;
   cuerpo: string;
}

function FormEnvio({ contactos, listas, user }: IFormEnvioProps) {
   const [form, setForm] = React.useState<IFormCampania>({
      asunto: "",
      nombreRemitente: "",
      correoRemitente: user.emailRemitente ?? "",
      cuerpo: "",
   });
   const [formError, setFormError] = React.useState<string>("");
   const [contactsSelection, setContactsSelection] = React.useState<number[]>(
      []
   );

   // const [openPreview, setOpenPreview] = useState(false);
   
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
  
   const handleSubmit = async () => {
      setFormError("");
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

      const emailRemitente = user.emailRemitente || form.correoRemitente + '@' + user.dominioRemitente;

      const dataToSend: ICreateCampania = {
         ...form,
         correoRemitente: emailRemitente,
         cuerpo: sanitize(marked.parse(form.cuerpo)),
         contactos: contactsSelection,
         lista_contactos: listsSelection,
      }
      // setOpenPreview(true)
      console.log(dataToSend);
      const res = await fetchCS({
         url: "/campanas",
         method: "POST",
         data: dataToSend,
      });
      console.log(res);
   };

   if(!user.emailRemitente && !user.dominioRemitente){
      throw Error('Usted no cuenta con correo o dominio verificado. Contacte con Ubuntu Marketing para la verificación de un correo o dominio para realizar campañas. Puede contactarnos a ubuntumarketingdigital0@gmail.com')
   }

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

         <h3 className="text-lg mb-5">Correo Remitente</h3>
         <div className="grid grid-cols-3 items-center">
           {
           user?.emailRemitente ? 
           <div className="col-span-2 grid grid-cols-2 items-center">
           <Input
              label="Correo electrónico remitente:"
              name="correoRemitente"
              classContainer=""
              value={correoRemitente}
              disabled={true}
              onChange={handleChange}
           />
        </div>
           :
           <div className="col-span-2 grid grid-cols-2 items-center">
               <Input
                  label="Correo electrónico remitente"
                  name="correoRemitente"
                  classContainer=""
                  value={correoRemitente}
                  onChange={handleChange}
               />
               <p className="t translate-y-3 ml-2">@{user.dominioRemitente}</p>
            </div>}
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

         {/* <Modal isActive={openPreview} setIsActive={setOpenPreview} keyPortal="preview">
            <div className='editor-container w-[960px] max-h-[500px] overflow-scroll' dangerouslySetInnerHTML={{ __html: sanitize(marked.parse(form.cuerpo))}}></div>
         </Modal> */}

         <Button
            type="button"
            label="Realizar la campaña"
            className="w-full"
            loading={loading}
            onClick={() => handleSubmit()}
         />
      </form>
   );
}

export default FormEnvio;
