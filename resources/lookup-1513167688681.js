(function(window, undefined) {
  var dictionary = {
    "200d4b74-0624-4030-9d4b-72e3f4dfe2b9": "Interview",
    "9d3ecb3c-a9fd-4673-9793-ba0982d7b634": "Log In",
    "890fb128-3237-4681-8c8a-60625df3de2c": "Screen C Step 3 If Yes",
    "2b6c133e-f4b0-43a6-a24d-0e2cc788782f": "Edit Offers",
    "42e25225-93d5-48b2-bd7c-39ab8630272f": "Screen F - Step 3 If No",
    "bcac2f7f-86da-4fd6-9c6b-5fb871ff4707": "User Area",
    "13405d85-18c9-4304-8a82-a74facbcb1b1": "Interview with Red btn",
    "764dc5f3-6dfb-4ff4-a828-50190cd4f489": "Imprint",
    "b275c864-c41a-4ac8-b286-b1c39740809f": "Invite 4.0",
    "2f63a12a-c202-4486-970c-bb61cb8be005": "Screen G_ You Again",
    "4701de58-790f-4065-ac2f-89ae1230ec99": "Step 3 If Yes",
    "4cc00a90-3c19-49c7-8887-a81a65fe5197": "Screen E Exit",
    "2474af1c-d0f3-4f9a-8467-232c385be6be": "Interview Q5",
    "80a53715-129f-440f-94db-2870764abe55": "Edit User Area 1",
    "b215a576-2a0d-491a-be01-063abbd36f66": "Interview Q4",
    "345d884e-c6dc-49ac-9ab6-4a893b5ed377": "Screen H",
    "d12245cc-1680-458d-89dd-4f0d7fb22724": "Screen G",
    "14dcb75c-9084-426c-bd5a-12b20171f160": "Interview Q3",
    "8ecd8f63-918e-431c-8e0f-522d95fb1741": "Interview Q2",
    "cddb38da-7f27-4c5c-b52e-a0f514d991a4": "Screen F",
    "583b2a83-160c-431f-b4b5-f0b0a6a03564": "Edit Answers",
    "804d6b69-a55a-48a1-a364-e929e74a70c4": "Step 2",
    "012e6aa3-6686-4b56-9a41-d6af33eab4f8": "Imprint 4.0",
    "6a1660af-cc2f-44b5-b788-19cff323ea01": "Edit Profile",
    "2ffe54d8-2627-4756-912a-2cd89884adaf": "Screen H_Pers Career Conslt.",
    "9015ba62-51aa-4ca5-9562-7a4d7756b57c": "Screen C",
    "76b9786b-952d-46a8-8237-18e1ae72160d": "Home- User Area",
    "cedf1a6c-1f8c-4612-9b2b-8568286e8ab4": "Screen B",
    "e3d426d4-5535-4e5c-b92c-0e3a64c91ebe": "Screen A",
    "cb3cf1da-8ffd-4a26-9a2c-5225d34b2d5e": "Invite",
    "d00478a8-b27b-429a-8d80-cad649aa48bc": "Edit Docs",
    "20686c86-9628-4bc5-a1db-856bf91b2301": "Profile- Single Page Structure",
    "79f8d72a-61d1-4291-8e9e-001151b6d624": "Invite-Single Page Structure",
    "87db3cf7-6bd4-40c3-b29c-45680fb11462": "960 grid - 16 columns",
    "e5f958a4-53ae-426e-8c05-2f7d8e00b762": "960 grid - 12 columns",
    "f39803f7-df02-4169-93eb-7547fb8c961a": "Template 1",
    "bb8abf58-f55e-472d-af05-a7d1bb0cc014": "default"
  };

  var uriRE = /^(\/#)?(screens|templates|masters|scenarios)\/(.*)(\.html)?/;
  window.lookUpURL = function(fragment) {
    var matches = uriRE.exec(fragment || "") || [],
        folder = matches[2] || "",
        canvas = matches[3] || "",
        name, url;
    if(dictionary.hasOwnProperty(canvas)) { /* search by name */
      url = folder + "/" + canvas;
    }
    return url;
  };

  window.lookUpName = function(fragment) {
    var matches = uriRE.exec(fragment || "") || [],
        folder = matches[2] || "",
        canvas = matches[3] || "",
        name, canvasName;
    if(dictionary.hasOwnProperty(canvas)) { /* search by name */
      canvasName = dictionary[canvas];
    }
    return canvasName;
  };
})(window);