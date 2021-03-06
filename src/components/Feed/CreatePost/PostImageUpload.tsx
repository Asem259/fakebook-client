import { Dispatch, SetStateAction } from 'react';
import {
  Group,
  Text,
  CloseButton,
  Image,
  Grid,
  createStyles,
} from '@mantine/core';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';

import { TbPhoto } from 'react-icons/tb';

const useStyles = createStyles((theme) => ({
  dropZone: {
    border:
      theme.colorScheme === 'dark'
        ? `1px solid ${theme.colors.dark[4]}`
        : `1px solid ${theme.colors.gray[4]}`,
  },
  wrapper: {
    minHeight: 220,
    width: '100%',
    justifyContent: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: '8px',
    right: '8px',
    zIndex: 10,
    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[4]
          : theme.colors.gray[2],
    },
  },
  previewCloseBtn: {
    position: 'absolute',
    top: '14px',
    right: '14px',
    zIndex: 10,
    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'light'
          ? theme.fn.rgba(theme.colors.gray[6], 0.7)
          : theme.fn.rgba(theme.colors.dark[6], 0.4),
    },
  },
}));

export const dropzoneChildren = (setShow: (v: boolean) => void) => {
  const { classes, theme } = useStyles();
  return (
    <Group
      position='center'
      direction='column'
      spacing='xs'
      className={classes.wrapper}
    >
      <CloseButton
        onClick={(e) => {
          e.stopPropagation();
          setShow(false);
        }}
        className={classes.closeButton}
      />
      <TbPhoto
        size={80}
        color={
          theme.colorScheme === 'dark'
            ? theme.colors.dark[0]
            : theme.colors.gray[7]
        }
      />
      <Text size='md'>Drag images here or click to select files</Text>
    </Group>
  );
};

interface PreviewProps {
  images: File[];
  setImages: Dispatch<SetStateAction<File[]>>;
}

const Preview = ({ images, setImages }: PreviewProps) => {
  const { classes } = useStyles();

  return (
    <Grid columns={12} sx={{ marginTop: '12px' }}>
      {images.map((file, i) => {
        const imageUrl = URL.createObjectURL(file);
        return (
          <Grid.Col key={file.name + i} span={4} sx={{ position: 'relative' }}>
            <CloseButton
              onClick={() =>
                setImages((pre) => pre.filter((f) => file.name !== f.name))
              }
              className={classes.previewCloseBtn}
              size={18}
              variant='filled'
              color='gray'
            />

            <Image
              radius='sm'
              key={i}
              src={imageUrl}
              height='148px'
              width='100%'
              imageProps={{ onLoad: () => URL.revokeObjectURL(imageUrl) }}
            />
          </Grid.Col>
        );
      })}
    </Grid>
  );
};

interface PostImageUploadProps {
  setShow: Dispatch<SetStateAction<boolean>>;
  images: File[];
  setImages: Dispatch<SetStateAction<File[]>>;
}
export const PostImageUpload = ({
  setShow,
  images,
  setImages,
}: PostImageUploadProps) => {
  const { classes } = useStyles();

  const onDrop = (files: File[]) => {
    const uniqueFiles = files.reduce<File[]>((acc, current) => {
      const exist = images.find((image) => image.name === current.name);
      if (exist) return acc;
      return [...acc, current];
    }, []);
    setImages((pre) => [...pre, ...uniqueFiles]);
  };

  return (
    <>
      <Dropzone
        onDrop={onDrop}
        onReject={(files) => console.log('rejected files', files)}
        maxSize={3 * 1024 ** 2}
        accept={IMAGE_MIME_TYPE}
        classNames={{
          root: classes.dropZone,
        }}
      >
        {() => dropzoneChildren(setShow)}
      </Dropzone>
      <Preview images={images} setImages={setImages} />
    </>
  );
};
