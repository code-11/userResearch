from PIL import Image
import os
curr_dir=os.getcwd()
pict_dir=curr_dir+"/pictures"
files=os.listdir( pict_dir )
# files = filter(os.path.isfile, os.listdir( pict_dir ) )  # files only

for pict in files:
	im = Image.open(pict_dir+"/"+pict)
	filepath,extension=pict.split(".")
	new_path=pict_dir+"/"+filepath+"_cropped."+extension

	sx,sy=im.size
	box=(0,140,sx,sy)
	cropped=im.crop(box)
	cropped.save(open(new_path,"w+"))