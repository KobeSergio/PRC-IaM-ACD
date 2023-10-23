import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  addDoc,
  collection,
  getDocs,
  deleteDoc,
  updateDoc,
  query,
  where,
  setDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
  getBlob,
} from "firebase/storage";
import { Inspection } from "@/types/Inspection";
import { Client } from "@/types/Client";
import { RO } from "@/types/RO";
import { Log } from "@/types/Log";
import { OC } from "@/types/OC";
import { PRB } from "@/types/PRB";
import { ACD } from "@/types/ACD";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//Firebase constants
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
const clientsRef = collection(db, "clients");
const prbRef = collection(db, "prb");
const inspectionsRef = collection(db, "inspections");
const roRef = collection(db, "ro");
const ocRef = collection(db, "oc");
const acdRef = collection(db, "acd");
const DATE_NOW = new Date().toLocaleString();

export default class Firebase {
  //Constructor with the user's id as a parameter to be reused later on logs.

  //GET: Sign in funciton.
  //Returns 200 if successful, 400 if email is not found, 401 if password is incorrect, and 500 if there is an error.
  async signIn(email: string, password: string) {
    try {
      const q = query(collection(db, "acd"), where("email", "==", email));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        console.log("No matching documents.");
        return { status: 400 };
      }
      for (const doc of querySnapshot.docs) {
        if (doc.data().password === password) {
          console.log(doc.data());
          return { status: 200, data: doc.data() };
        }
      }
      return { status: 401 };
    } catch (error) {
      console.log(error);
      return { status: 500 };
    }
  }

  //GET: Get all user accounts (PRB, RO, OC).
  //Returns user list if successful, [] if there is an error.
  async getAllUsers() {
    try {
      const userPromises = [
        this.getAllPRBs(),
        this.getAllROs(),
        this.getAllOCs(),
      ];
      const [prb, ro, oc] = await Promise.all(userPromises);
      return { PRB: prb, RO: ro, OC: oc } as any;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  //GET: Get all clients.
  //Returns ro list if successful, [] if there is an error.
  async getAllClients() {
    try {
      const querySnapshot = await getDocs(clientsRef);
      const clients: Client[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data() as Client;
        data.client_id = doc.id;
        clients.push(data);
      });
      return clients;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async getAllInspections() {
    try {
      const querySnapshot = await getDocs(inspectionsRef);
      const inspections: Inspection[] = [];

      for (const doc of querySnapshot.docs) {
        const data = doc.data() as Inspection;
        data.inspection_id = doc.id;

        // Create an array of promises
        const promises = [
          this.getClientDetails(data.client_details.client_id),
          this.getRODetails(data.ro_details.ro_id),
          this.getPRBDetails(data.prb_details.prb_id),
          this.getOCDetails(data.oc_details.oc_id),
          this.getACDDetails(data.acd_details.acd_id),
        ];

        // Wait for all promises to resolve
        const [client, ro, prb, oc, acd] = await Promise.all(promises);

        //Overrides firebase data with data from other collections
        if (client != null) data.client_details = client as Client;
        if (ro != null) data.ro_details = ro as RO;
        if (prb != null) data.prb_details = prb as PRB;
        if (oc != null) data.oc_details = oc as OC;
        if (acd != null) data.acd_details = acd as ACD;
        inspections.push(data);
      }

      return inspections;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  //GET: Get single inspection.
  //Returns inspection if successful, null if there is an error.
  async getInspection(inspection_id: string) {
    try {
      const docRef = doc(db, "inspections", inspection_id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data() as Inspection;

        // Create an array of promises
        const promises = [
          this.getClientDetails(data.client_details.client_id),
          this.getRODetails(data.ro_details.ro_id),
          this.getPRBDetails(data.prb_details.prb_id),
          this.getOCDetails(data.oc_details.oc_id),
          this.getACDDetails(data.acd_details.acd_id),
        ];

        // Wait for all promises to resolve
        const [client, ro, prb, oc, acd] = await Promise.all(promises);

        //Overrides firebase data with data from other collections
        if (client != null) data.client_details = client as Client;
        if (ro != null) data.ro_details = ro as RO;
        if (prb != null) data.prb_details = prb as PRB;
        if (oc != null) data.oc_details = oc as OC;
        if (acd != null) data.acd_details = acd as ACD;

        return data;
      } else {
        console.log("No such document!");
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  //GET: Get single client.
  //Returns client if successful, null if there is an error.
  async getClientDetails(client_id: string) {
    try {
      const docRef = doc(db, "clients", client_id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data() as Client;
      } else {
        console.log("No such document!");
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  //GET: Get single ro.
  //Returns ro if successful, null if there is an error.
  async getRODetails(ro_id: string) {
    try {
      const docRef = doc(db, "ro", ro_id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data() as RO;
      } else {
        console.log("No such document!");
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  //GET: Get single prb.
  //Returns prb if successful, null if there is an error.
  async getPRBDetails(prb_id: string) {
    try {
      const docRef = doc(db, "prb", prb_id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data() as PRB;
      } else {
        console.log("No such document!");
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  //GET: Get single oc.
  //Returns oc if successful, null if there is an error.
  async getOCDetails(oc_id: string) {
    try {
      const docRef = doc(db, "oc", oc_id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data() as OC;
      } else {
        console.log("No such document!");
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  //GET: Get single acd.
  //Returns acd if successful, null if there is an error.
  async getACDDetails(acd_id: string) {
    try {
      const docRef = doc(db, "acd", acd_id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data() as ACD;
      } else {
        console.log("No such document!");
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  //GET: Get all ROs.
  //Returns ro list if successful, [] if there is an error.
  async getAllROs() {
    try {
      const querySnapshot = await getDocs(roRef);
      const ro: RO[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data() as RO;
        data.ro_id = doc.id;
        ro.push(data);
      });
      return ro;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  //GET: Get all PRBs.
  //Returns ro list if successful, [] if there is an error.
  async getAllPRBs() {
    try {
      const querySnapshot = await getDocs(prbRef);
      const prb: PRB[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data() as PRB;
        data.prb_id = doc.id;
        prb.push(data);
      });
      return prb;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  //GET: Get all OCs.
  //Returns ro list if successful, [] if there is an error.
  async getAllOCs() {
    try {
      const querySnapshot = await getDocs(ocRef);
      const oc: OC[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data() as OC;
        data.oc_id = doc.id;
        oc.push(data);
      });
      return oc;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  //GET: Get all Logs.
  //Returns log list if successful, [] if there is an error.
  async getAllLogs() {
    try {
      const querySnapshot = await getDocs(collection(db, "logs"));
      const logs: Log[] = [];
      for (const doc of querySnapshot.docs) {
        const data = doc.data() as Log;
        data.log_id = doc.id;
        // Create an array of promises
        const promises = [
          this.getClientDetails(data.client_details.client_id),
          data.author_type === "prb"
            ? this.getPRBDetails(data.author_id)
            : data.author_type === "ro"
            ? this.getRODetails(data.author_id)
            : data.author_type === "oc"
            ? this.getOCDetails(data.author_id)
            : this.getACDDetails(data.author_id),
        ];
        // Wait for all promises to resolve
        const [client, author] = await Promise.all(promises);
        //Overrides firebase data with data from other collections
        if (client != null) data.client_details = client as Client;
        if (author != null) data.author_details = author as PRB | RO | OC | ACD;

        logs.push(data);
      }
      return logs;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  //POST: Create a new inspection.
  //Returns 200 if successful, 400 if there is an error.
  async createInspection(inspectionForm: Inspection) {
    try {
      const docRef = await addDoc(inspectionsRef, {
        ...inspectionForm,
        createdAt: DATE_NOW,
      });
      await updateDoc(docRef, {
        inspection_id: docRef.id,
      });
      return { status: 200 };
    } catch (error) {
      console.log(error);
      return { status: 400 };
    }
  }

  //POST: Create a new RO.
  //Returns 200 if successful, 400 if there is an error.
  async createNewRO(roForm: RO) {
    try {
      const docRef = await addDoc(roRef, {
        ...roForm,
      });
      await updateDoc(docRef, {
        ro_id: docRef.id,
      });
      return { status: 200 };
    } catch (error) {
      console.log(error);
      return { status: 400 };
    }
  }

  //POST: Create a new PRB.
  //Returns 200 if successful, 400 if there is an error.
  async createNewPRB(prbForm: PRB) {
    try {
      const docRef = await addDoc(prbRef, {
        ...prbForm,
      });
      await updateDoc(docRef, {
        prb_id: docRef.id,
      });
      return { status: 200 };
    } catch (error) {
      console.log(error);
      return { status: 400 };
    }
  }

  //POST: Create a new OC.
  //Returns 200 if successful, 400 if there is an error.
  async createNewOC(ocForm: OC) {
    try {
      const docRef = await addDoc(ocRef, {
        ...ocForm,
      });
      await updateDoc(docRef, {
        oc_id: docRef.id,
      });
      return { status: 200 };
    } catch (error) {
      console.log(error);
      return { status: 400 };
    }
  }

  //POST: Create a new client.
  //Returns 200 if successful, 400 if there is an error.
  async createNewClient(clientForm: Client) {
    try {
      const docRef = await addDoc(clientsRef, {
        ...clientForm,
      });
      await updateDoc(docRef, {
        client_id: docRef.id,
      });
      return { status: 200 };
    } catch (error) {
      console.log(error);
      return { status: 400 };
    }
  }

  //POST: Create log
  //Returns 200 if successful, 400 if there is an error.
  async createLog(log: Log, user_id: string) {
    try {
      const docRef = await addDoc(collection(db, "logs"), {
        ...log,
      });
      await updateDoc(docRef, {
        log_id: docRef.id,
        author_type: "acd",
        author_id: user_id,
      });
      return { status: 200 };
    } catch (error) {
      console.log(error);
      return { status: 400 };
    }
  }

  //PUT: Update client
  //Returns 200 if successful, 400 if there is an error.
  async updateClient(client: Client) {
    try {
      const docRef = doc(db, "clients", client.client_id);
      await updateDoc(docRef, {
        ...client,
      });
      return { status: 200, client: client };
    } catch (error) {
      console.log(error);
      return { status: 400 };
    }
  }

  //PUT: Update RO details
  //Returns 200 if successful, 400 if there is an error.
  async updateRO(ro: RO) {
    try {
      const docRef = doc(db, "ro", ro.ro_id);
      await updateDoc(docRef, {
        ...ro,
      });
      return { status: 200, ro: ro };
    } catch (error) {
      console.log(error);
      return { status: 400 };
    }
  }

  //PUT: Update PRB details
  //Returns 200 if successful, 400 if there is an error.
  async updatePRB(prb: PRB) {
    try {
      const docRef = doc(db, "prb", prb.prb_id);
      await updateDoc(docRef, {
        ...prb,
      });
      return { status: 200, prb: prb };
    } catch (error) {
      console.log(error);
      return { status: 400 };
    }
  }

  //PUT: Update OC details
  //Returns 200 if successful, 400 if there is an error.
  async updateOC(oc: OC) {
    try {
      const docRef = doc(db, "oc", oc.oc_id);
      await updateDoc(docRef, {
        ...oc,
      });
      return { status: 200, oc: oc };
    } catch (error) {
      console.log(error);
      return { status: 400 };
    }
  }

  //PUT: Update inspection
  //Returns 200 if successful, 400 if there is an error.
  async updateInspection(inspection: Inspection) {
    try {
      const docRef = doc(db, "inspections", inspection.inspection_id);
      await updateDoc(docRef, { ...inspection });
      return { status: 200, inspection: inspection };
    } catch (error) {
      console.log(error);
      return { status: 400 };
    }
  }

  //DELETE: Delete PRB
  //Returns 200 if successful, 400 if there is an error.
  async deletePRB(prb_id: string) {
    try {
      await deleteDoc(doc(db, "prb", prb_id));
      return { status: 200 };
    } catch (error) {
      console.log(error);
      return { status: 400 };
    }
  }

  //DELETE: Delete RO
  //Returns 200 if successful, 400 if there is an error.
  async deleteRO(ro_id: string) {
    try {
      await deleteDoc(doc(db, "ro", ro_id));
      return { status: 200 };
    } catch (error) {
      console.log(error);
      return { status: 400 };
    }
  }

  //DELETE: Delete OC
  //Returns 200 if successful, 400 if there is an error.
  async deleteOC(oc_id: string) {
    try {
      await deleteDoc(doc(db, "oc", oc_id));
      return { status: 200 };
    } catch (error) {
      console.log(error);
      return { status: 400 };
    }
  }

  //Storage: Uploads the uploadTravelOrder to the storage bucket
  async uploadTravelOrder(file: File, inspection_id: string) {
    const storageRef = ref(storage, `files/${inspection_id}/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Wrap the uploadTask inside a new Promise
    await new Promise<void>((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          alert(`${error} - Failed to upload file.`);
          reject(error); // Reject the promise on error
        },
        async () => {
          await getDownloadURL(uploadTask.snapshot.ref).then(
            async (downloadURL) => {
              if (downloadURL === null || downloadURL === "") return;
              // Fetch the current document
              const inspectionDoc = doc(db, "inspections", inspection_id);

              // Update the document with the new array
              await setDoc(
                inspectionDoc,
                {
                  inspection_TO: downloadURL,
                },
                { merge: true }
              );

              resolve(); // Resolve the promise once the upload and update are done
            }
          );
        }
      );
    });
  }
  //Storage: Uploads the COC to the storage bucket
  async uploadCOC(file: File, inspection_id: string) {
    const storageRef = ref(storage, `files/${inspection_id}/coc-${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Wrap the uploadTask inside a new Promise
    await new Promise<void>((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          alert(`${error} - Failed to upload file.`);
          reject(error); // Reject the promise on error
        },
        async () => {
          await getDownloadURL(uploadTask.snapshot.ref).then(
            async (downloadURL) => {
              // Fetch the current document
              const inspectionDoc = doc(db, "inspections", inspection_id);

              // Update the document with the new array
              await setDoc(
                inspectionDoc,
                {
                  inspection_COC: downloadURL,
                  fulfilledAt: new Date().toLocaleString(),
                },
                { merge: true }
              );

              resolve(); // Resolve the promise once the upload and update are done
            }
          );
        }
      );
    });
  }
}
