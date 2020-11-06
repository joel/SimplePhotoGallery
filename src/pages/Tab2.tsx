import React, { useState } from 'react';
import { camera, trash, close } from 'ionicons/icons';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonFab,
  IonFabButton,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonImg,
  IonActionSheet
} from '@ionic/react';

import { usePhotoGallery, Photo } from '../hooks/usePhotoGallery';

import './Tab2.css';

const Tab2: React.FC = () => {
  const { photos, takePhoto, deletePhoto } = usePhotoGallery();
  const [photoToDelete, setPhotoToDelete] = useState<Photo>();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Photo Gallery</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          <IonRow>
            {photos.map((photo, index) => (
              <IonCol size='6' key={index}>
                <IonImg
                  src={photo.webviewPath}
                  onClick={() => setPhotoToDelete(photo)}
                />
                <IonActionSheet
                  isOpen={!!photoToDelete}
                  buttons={[
                    {
                      text: 'Delete',
                      role: 'destructive',
                      icon: trash,
                      handler: () => {
                        if (photoToDelete) {
                          deletePhoto(photoToDelete);
                          setPhotoToDelete(undefined);
                        }
                      },
                    },
                    {
                      text: 'Cancel',
                      icon: close,
                      role: 'cancel',
                    },
                  ]}
                  onDidDismiss={() => setPhotoToDelete(undefined)}
                />
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
        <IonFab vertical='bottom' horizontal='end' slot='fixed'>
          <IonFabButton color='primary' onClick={() => takePhoto()}>
            <IonIcon icon={camera}></IonIcon>
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
